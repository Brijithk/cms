import { useEffect, useState } from "react";
import "./TestResultPopup.css";

const testParameters = {
    "Blood Test": [
        "Hemoglobin (g/dL)",
        "WBC Count (cells/µL)",
        "RBC Count (million cells/µL)",
        "Platelet Count (cells/µL)",
        "Blood Sugar (mg/dL)",
    ],

    "Urine Test": [
        "Color",
        "Appearance",
        "pH",
        "Protein",
        "Glucose",
    ],

    "Liver Function Test": [
        "Total Bilirubin (mg/dL)",
        "SGOT / AST (U/L)",
        "SGPT / ALT (U/L)",
        "Alkaline Phosphatase (U/L)",
        "Albumin (g/dL)",
    ],

    "Kidney Function Test": [
        "Blood Urea (mg/dL)",
        "Serum Creatinine (mg/dL)",
        "Uric Acid (mg/dL)",
        "Sodium (mmol/L)",
        "Potassium (mmol/L)",
    ],

    "Lipid Profile": [
        "Total Cholesterol (mg/dL)",
        "HDL Cholesterol (mg/dL)",
        "LDL Cholesterol (mg/dL)",
        "Triglycerides (mg/dL)",
        "VLDL Cholesterol (mg/dL)",
    ],

    "Thyroid Profile": [
        "T3 (ng/dL)",
        "T4 (µg/dL)",
        "TSH (µIU/mL)",
        "Free T3 (pg/mL)",
        "Free T4 (ng/dL)",
    ],

    "General": [
        "Body Temperature (°C)",
        "Blood Pressure (mmHg)",
        "Blood Sugar (mg/dL)",
        "Heart Rate (bpm)",
        "Oxygen Saturation (SpO₂ %)",
    ],
};

function TestResultPopup({ test, onClose, onComplete }) {
    const [results, setResults] = useState({});
    const [technicianNotes, setTechnicianNotes] = useState("");

    useEffect(() => {
        if (test) {
            setResults({});
            setTechnicianNotes("");
        }
    }, [test]);

    if (!test) return null;

    const parameters =
        testParameters[test.test_name] || testParameters["General"];

    const handleResultChange = (parameter, value) => {
        setResults((prev) => ({
            ...prev,
            [parameter]: value,
        }));
    };

    const handleComplete = () => {
        console.log("Test Results:", results);
        console.log("Technician Notes:", technicianNotes);

        onComplete(test, results, technicianNotes);
    };

    return (
        <div className="test-popup-overlay">
            <div className="test-popup">

                <div className="test-popup-header">
                    <h2>Test Details</h2>

                    <button
                        className="test-popup-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="test-info">

                    <div className="test-info-item">
                        <label>Patient Name</label>
                        <span>
                            {test.patient_name || test.patient_id}
                        </span>
                    </div>

                    <div className="test-info-item">
                        <label>Test Name</label>
                        <span>{test.test_name}</span>
                    </div>

                </div>

                <div className="test-parameters">

                    <h3>
                        {test.test_name} Parameters
                    </h3>

                    {parameters.map((parameter) => (
                        <div
                            className="parameter-row"
                            key={parameter}
                        >
                            <label>{parameter}</label>

                            <input
                                type="text"
                                value={results[parameter] || ""}
                                onChange={(e) =>
                                    handleResultChange(
                                        parameter,
                                        e.target.value
                                    )
                                }
                                placeholder="Enter result"
                            />
                        </div>
                    ))}

                </div>

                <div className="technician-notes">

                    <label>Technician Notes</label>

                    <textarea
                        value={technicianNotes}
                        onChange={(e) =>
                            setTechnicianNotes(e.target.value)
                        }
                        placeholder="Enter technician notes..."
                        rows="4"
                    />

                </div>

                <div className="test-popup-actions">

                    <button
                        className="test-close-button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    <button
                        className="test-complete-button"
                        onClick={handleComplete}
                    >
                        Complete Test
                    </button>

                </div>

            </div>
        </div>
    );
}

export default TestResultPopup;