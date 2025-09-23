const assessments = [
  {
    session_id: "session_001",
    assessment_id: "as_hr_02",
    accuracy: 80,
    vitalsMap: {
      vitals: { bp_sys: 124, bp_dia: 82, heart_rate: 75 }
    },
    bodyCompositionData: { BMI: "33.145" },
    exercises: [{ id: 235, name: "Jog test", setList: [{ time: 61 }] }]
  },
  {
    session_id: "session_002",
    assessment_id: "as_card_01",
    accuracy: 17,
    vitalsMap: {
      vitals: { bp_sys: 110, bp_dia: 75, heart_rate: 66 }
    },
    bodyCompositionData: { BMI: "26.23" },
    exercises: [{ id: 235, name: "Jog test", setList: [{ time: 47 }] }]
  }
];

module.exports = assessments;
