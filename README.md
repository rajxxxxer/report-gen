# 📊 Report Generator with Authentication

This project is a full-stack **Assessment Report Generator** with **JWT authentication**.  
It provides:
- User login with JWT tokens
- Backend APIs for generating assessment reports as PDF
- React frontend with authentication flow + report generation UI
- Config-driven report system (flexible, no hardcoding)

---

## ⚙️ Tech Stack
- **Backend:** Node.js, Express.js, Puppeteer, JWT
- **Frontend:** React (Vite), Tailwind CSS
- **Authentication:** JWT-based
- **Config-driven:** Dynamic JSON path mapping

---

## 🚀 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/rajxxxxer/report-gen.git
cd report-gen
2. Backend Setup
bash
Copy code
cd backend
npm install
Start backend server:

bash
Copy code
nodemon server.js
Backend runs at http://localhost:5000

3. Frontend Setup
Open a new terminal:

bash
Copy code
cd my-app
npm install
npm run dev
Frontend runs at http://localhost:5173

🔑 Authentication Flow
Backend (backend/routes/authRoutes.js)
Provides login API:

Accepts username, password.

Returns a JWT token if valid.

JWT secret is stored in config/config.js (jwtSecret).

Frontend (src/pages/auth.jsx)
Simple login form.

Calls backend /auth/login API.

Stores token in local state/localStorage.

Redirects user to Home page (page.jsx) after login.

Home Page (src/pages/page.jsx)
Shows a welcome message with username (decoded from JWT token).

Displays Report Generator component.

📄 Report Generation Flow
Backend (backend/routes/reportRoutes.js)
API: /api/generate-report?session_id=...

Finds record in backend/data.js

Loads config for that assessment_id from backend/config/config.js

Maps fields → values dynamically (using JSON path logic)

Generates PDF with Puppeteer

Returns filename → frontend

Frontend (components/ReportGenerator.jsx)
Input: session_id (e.g., session_001)

Calls backend with stored token

Shows a download PDF button when ready

🛠️ Configuration System Design
The key design: reports are driven by config, not code.
Defined in backend/config/config.js

Example
js
Copy code
as_hr_02: {
  sections: [
    { title: "Overall Health Score", field: "accuracy" },
    { title: "Heart Rate", field: "vitalsMap.vitals.heart_rate" },
    { title: "Blood Pressure Systolic", field: "vitalsMap.vitals.bp_sys" },
    { title: "Cardiovascular Endurance", field: "exercises[0].setList[0].time" },
    { title: "BMI", field: "bodyCompositionData.BMI" }
  ]
}
title: Display name in PDF

field: Path in JSON (dot notation + array access)

Example Data
json
Copy code
{
  "session_id": "session_001",
  "assessment_id": "as_hr_02",
  "accuracy": 80,
  "vitalsMap": { "vitals": { "bp_sys": 124, "heart_rate": 75 } },
  "bodyCompositionData": { "BMI": "33.145" },
  "exercises": [{ "id": 235, "setList": [{ "time": 61 }] }]
}
Field → "vitalsMap.vitals.heart_rate" → Value: 75
Field → "exercises[0].setList[0].time" → Value: 61

📂 Project Structure
bash
Copy code
report-gen/
│── backend/
│   ├── config/config.js        # Assessment configs
│   ├── data.js                 # Sample data
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication APIs
│   │   └── reportRoutes.js     # Report generation API
│   ├── server.js               # Express entry
│   └── reports/                # Generated PDFs
│
│── my-app/
│   ├── src/pages/
│   │   ├── auth.jsx            # Login page
│   │   └── page.jsx            # Home page
│   ├── src/components/
│   │   └── ReportGenerator.jsx # Generate report UI
│   ├── package.json
│   └── ...
│
└── README.md



👤 Author
Developed by Rajxxxxer ✨
