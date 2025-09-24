
module.exports = {
  jwtSecret: "supersecretkey", // real case me .env use karna
  pdfPath: "./backend/reports",

  assessmentConfig: {
    // 🟢 Health & Fitness Assessment
    as_hr_02: {
      sections: [
        // Key Body Vitals
        { title: "Overall Health Score", field: "accuracy" },
        { title: "Heart Rate (in Key Body Vitals)", field: "vitalsMap.vitals.heart_rate" },
        { title: "Blood Pressure Systolic", field: "vitalsMap.vitals.bp_sys" },
        { title: "Blood Pressure Diastolic", field: "vitalsMap.vitals.bp_dia" },

        // Fitness Levels
        { title: "Cardiovascular Endurance (in Fitness Levels)", field: "exercises[0].setList[0].time" },

        // Body Composition
        { title: "BMI (in Body Composition)", field: "bodyCompositionData.BMI" },

        // Future placeholders (if data exists in JSON later)
        { title: "Stress Level", field: "stressLevel" },
        { title: "Posture", field: "postureScore" }
      ]
    },

    // 🔴 Cardiac Assessment
    as_card_01: {
      sections: [
        // Key Body Vitals
        { title: "Overall Health Score", field: "accuracy" },
        { title: "Heart Rate (in Key Body Vitals)", field: "vitalsMap.vitals.heart_rate" },
        { title: "Blood Pressure Systolic", field: "vitalsMap.vitals.bp_sys" },
        { title: "Blood Pressure Diastolic", field: "vitalsMap.vitals.bp_dia" },

        // Fitness Levels
        { title: "Cardiovascular Endurance (in Fitness Levels)", field: "exercises[0].setList[0].time" },

        // Body Composition
        { title: "BMI (in Body Composition)", field: "bodyCompositionData.BMI" }
      ]
    }
  }
};
