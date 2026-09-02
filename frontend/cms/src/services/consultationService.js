import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/consultations/";


export const createConsultation = async (consultationData) => {

    const response = await axios.post(
        API_URL,
        consultationData
    );

    return response.data;
};


// Get all consultations
export const getConsultations = async () => {

    const response = await axios.get(API_URL);

    return response.data;
};


// Get consultation for a specific appointment
export const getConsultationByAppointment = async (
    appointmentId
) => {

    const response = await axios.get(
        `${API_URL}?appointment=${appointmentId}`
    );

    return response.data;
};