const express = require("express");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const assessments = require("../data");
const { assessmentConfig, pdfPath } = require("../config/config");

const router = express.Router();

//
function getValue(obj, pathStr) {
  try {
    const parts = pathStr.split(".");
    let acc = obj;

    for (const part of parts) {
      if (!acc) return "--";

      // Array with id selector: exercises[id=235]
      const idMatch = part.match(/^(\w+)\[id=(\d+)\]$/);
      if (idMatch) {
        const key = idMatch[1];
        const id = Number(idMatch[2]);
        acc = acc[key].find(item => item.id === id);
        continue;
      }

      // Normal array index: exercises[0]
      const indexMatch = part.match(/^(\w+)\[(\d+)\]$/);
      if (indexMatch) {
        const key = indexMatch[1];
        const idx = Number(indexMatch[2]);
        acc = acc[key][idx];
        continue;
      }

      // Regular object property
      acc = acc[part];
    }

    return acc !== undefined ? acc : "--";
  } catch {
    return "--";
  }
}


router.get("/generate-report", async (req, res) => {
  const { session_id } = req.query;

  // Find the assessment record
  const record = assessments.find(r => r.session_id === session_id);
  if (!record) return res.status(404).json({ message: "Session not found" });

  // Get configuration for this assessment type
  const config = assessmentConfig[record.assessment_id];
  if (!config) return res.status(400).json({ message: "Config not found" });

  // Map config sections to actual values
  const sections = config.sections.map(s => ({
    title: s.title,
    value: getValue(record, s.field),
  }));

  // Generate HTML for PDF
  const html = `
    <html>
      <head><title>Assessment Report</title></head>
      <body style="font-family: Arial; padding:20px;">
        <h1>Assessment Report</h1>
        ${sections.map(sec => `<p><b>${sec.title}:</b> ${sec.value}</p>`).join("")}
      </body>
    </html>
  `;

  // Ensure PDF folder exists
  if (!fs.existsSync(pdfPath)) fs.mkdirSync(pdfPath, { recursive: true });

  // Generate PDF using Puppeteer
  const fileName = `${session_id}_${Date.now()}.pdf`;
  const filePath = path.join(pdfPath, fileName);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: filePath, format: "A4" });
    await browser.close();
  } catch (err) {
    return res.status(500).json({ message: "PDF generation failed", error: err.message });
  }

  res.json({ message: "PDF generated successfully", file: fileName });
});

module.exports = router;
