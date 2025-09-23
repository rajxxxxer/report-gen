module.exports = {
  jwtSecret: "supersecretkey", // real case me .env use karna
  pdfPath: "./backend/reports",
  assessmentConfig: {
    as_hr_02: {
      sections: [
        { title: "Overall Score", field: "accuracy" },
        { title: "Heart Rate", field: "vitalsMap.vitals.heart_rate" },
        { title: "BMI", field: "bodyCompositionData.BMI" },
        { title: "Cardio Time", field: "exercises[0].setList[0].time" }
      ]
    },
    as_card_01: {
      sections: [
        { title: "Overall Score", field: "accuracy" },
        { title: "Blood Pressure Systolic", field: "vitalsMap.vitals.bp_sys" },
        { title: "Blood Pressure Diastolic", field: "vitalsMap.vitals.bp_dia" },
        { title: "BMI", field: "bodyCompositionData.BMI" }
      ]
    }
  }
};
