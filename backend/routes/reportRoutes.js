const express = require("express");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const assessments = require("../data");
const { assessmentConfig, pdfPath } = require("../config/config");

const router = express.Router();

// helper to fetch nested values like exercises[0].setList[0].time
function getValue(obj, pathStr) {
  try {
    return pathStr.split(".").reduce((acc, part) => {
      if (part.includes("[")) {
        const [arr, idx] = part.replace("]", "").split("[");
        return acc[arr][parseInt(idx)];
      }
      return acc[part];
    }, obj);
  } catch {
    return "--";
  }
}

router.get("/generate-report", async (req, res) => {
  const { session_id } = req.query;
  const record = assessments.find(r => r.session_id === session_id);
  if (!record) return res.status(404).json({ message: "Session not found" });

  const config = assessmentConfig[record.assessment_id];
  if (!config) return res.status(400).json({ message: "Config not found" });

  const sections = config.sections.map(s => ({
    title: s.title,
    value: getValue(record, s.field),
  }));

  const html = `
    <html>
      <head><title>Report</title></head>
      <body style="font-family: Arial; padding:20px;">
        <h1>Assessment Report</h1>
        ${sections.map(sec => `<p><b>${sec.title}:</b> ${sec.value}</p>`).join("")}
      </body>
    </html>
  `;

  const fileName = `${session_id}_${Date.now()}.pdf`;
  const filePath = path.join(pdfPath, fileName);

  if (!fs.existsSync(pdfPath)) fs.mkdirSync(pdfPath, { recursive: true });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: filePath, format: "A4" });
  await browser.close();

  res.json({ message: "PDF generated", file: fileName });
});

module.exports = router;
