import React, { useState } from "react";

export default function ReportGenerator({ token }) {
  const [sessionId, setSessionId] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!sessionId) return alert("Please enter session_id");
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/generate-report?session_id=${encodeURIComponent(
          sessionId
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok && data.file) {
        setPdfLink(`http://localhost:5000/reports/${data.file}`);
      } else {
        alert(data.message || "Failed to generate");
        setPdfLink("");
      }
    } catch (err) {
      alert("Error: " + err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 max-w-xl border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl text-amber-300 font-semibold mb-4">📄 Generate Assessment Report</h2>

      {/* Input + Button Row */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter session_id (e.g., session_001)"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          className="flex-1 text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          onClick={generateReport}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white text-sm transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* Download Button */}
      {pdfLink && (
        <div className="mt-3">
          <span className="text-green-600 font-medium">✅ Report ready:</span>
          <a
            href={pdfLink}
            target="_blank"
            rel="noreferrer"
            download
            className="ml-2 inline-block bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition"
          >
            Download PDF
          </a>
        </div>
      )}

      {/* Tip */}
      <div className="mt-4 text-gray-500 text-sm">
        💡 Tip: Try <code className="bg-gray-100 px-1 rounded">session_001</code>{" "}
        or <code className="bg-gray-100 px-1 rounded">session_002</code> with the
        sample data.
      </div>
    </div>
  );
}
