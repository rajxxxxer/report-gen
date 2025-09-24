import React, { useState } from 'react';

export default function ReportGenerator({ token }) {
  const [sessionId, setSessionId] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!sessionId) return alert('enter session_id');
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/generate-report?session_id=${encodeURIComponent(sessionId)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.link) {
        setPdfLink(`http://localhost:5000${data.link}`);
      } else {
        alert(data.message || 'Failed to generate');
        setPdfLink('');
      }
    } catch (err) {
      alert('Error: ' + err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='' style={{marginTop:20, border:'1px solid #eee', padding:16, borderRadius:8}}>
      <h2>Generate Report</h2>
      <input placeholder="session_id (e.g., session_001)" value={sessionId} onChange={e=>setSessionId(e.target.value)} style={{width:'60%', marginRight:8}} />
      <button onClick={generateReport} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>

      {pdfLink && (
        <div style={{marginTop:12}}>
          ✅ Report ready: <a href={pdfLink} target="_blank" rel="noreferrer">Download PDF</a>
        </div>
      )}

      <div style={{marginTop:12, color:'#555'}}>
        Tip: use <code>session_001</code> or <code>session_002</code> to test with sample data.
      </div>
    </div>
  );
}
