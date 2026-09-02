import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/PrescribedLab/";

export const getPrescribedTests = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updatePrescribedTestStatus = async (
    testId,
    status,
    results = {},
    technicianNotes = ""
) => {
    const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/PrescribedLabDetailView/${testId}/`,
        {
            status,
            results,
            technician_notes: technicianNotes,
        }
    );

    return response.data;
};
