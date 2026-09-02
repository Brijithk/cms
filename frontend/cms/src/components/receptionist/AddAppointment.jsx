// import { useEffect, useState } from "react";
// import "./AddAppointment.css";
// import { getDoctors } from "../../services/doctorService";

// function AddAppointment({ patient, onClose, onAppointmentBooked }) {

//     const [doctors, setDoctors] = useState([]);
//     const [loadingDoctors, setLoadingDoctors] = useState(true);

//     const [formData, setFormData] = useState({
//         patient_id: patient?.patient_id || "",
//         patient_name: patient?.full_name || "",
//         doctor_id: "",
//         doctor_name: "",
//         department: "",
//         date: "",
//         time: "",
//         reason: ""
//     });

//     useEffect(() => {

//         const fetchDoctors = async () => {

//             try {

//                 const data = await getDoctors();

//                 console.log("DOCTORS:", data);

//                 setDoctors(data);

//             } catch (error) {

//                 console.error("Error fetching doctors:", error);

//             } finally {

//                 setLoadingDoctors(false);

//             }
//         };

//         fetchDoctors();

//     }, []);


//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };


//     const handleDoctorChange = (e) => {

//         const selectedDoctorId = e.target.value;

//         const selectedDoctor = doctors.find(
//             (doctor) =>
//                 String(doctor.id) === String(selectedDoctorId)
//         );

//         if (!selectedDoctor) {

//             setFormData((prev) => ({
//                 ...prev,
//                 doctor_id: "",
//                 doctor_name: "",
//                 department: ""
//             }));

//             return;
//         }

//         setFormData((prev) => ({
//             ...prev,
//             doctor_id: selectedDoctor.id,
//             doctor_name: selectedDoctor.name,
//             department: selectedDoctor.department
//         }));
//     };


//     const handleSubmit = (e) => {

//         e.preventDefault();

//         const appointmentData = {
//             ...formData
//         };

//         console.log(
//             "Appointment Data:",
//             appointmentData
//         );

//         if (onAppointmentBooked) {
//             onAppointmentBooked(appointmentData);
//         }

//         onClose();
//     };


//     return (
//         <div className="appointment-overlay">

//             <div className="appointment-card">

//                 {/* Header */}
//                 <div className="appointment-header">

//                     <div>
//                         <h2>Book Appointment</h2>

//                         <p>
//                             Schedule an appointment for the patient
//                         </p>
//                     </div>

//                     <button
//                         className="close-button"
//                         onClick={onClose}
//                     >
//                         ×
//                     </button>

//                 </div>


//                 <form onSubmit={handleSubmit}>

//                     <div className="appointment-form">

//                         {/* Patient ID */}
//                         <div className="form-group">

//                             <label>Patient ID</label>

//                             <input
//                                 type="text"
//                                 value={`P${String(
//                                     formData.patient_id
//                                 ).padStart(3, "0")}`}
//                                 readOnly
//                             />

//                         </div>


//                         {/* Patient Name */}
//                         <div className="form-group">

//                             <label>Patient Name</label>

//                             <input
//                                 type="text"
//                                 value={formData.patient_name}
//                                 readOnly
//                             />

//                         </div>


//                         {/* Doctor */}
//                         <div className="form-group">

//                             <label>Doctor</label>

//                             <select
//                                 name="doctor_id"
//                                 value={formData.doctor_id}
//                                 onChange={handleDoctorChange}
//                                 required
//                             >

//                                 <option value="">
//                                     {loadingDoctors
//                                         ? "Loading doctors..."
//                                         : "Select Doctor"}
//                                 </option>

//                                 {doctors.map((doctor) => (

//                                     <option
//                                         key={doctor.id}
//                                         value={doctor.id}
//                                     >
//                                         {doctor.name}
//                                     </option>

//                                 ))}

//                             </select>

//                         </div>


//                         {/* Department */}
//                         <div className="form-group">

//                             <label>Department</label>

//                             <input
//                                 type="text"
//                                 value={formData.department}
//                                 placeholder="Department"
//                                 readOnly
//                             />

//                         </div>


//                         {/* Date */}
//                         <div className="form-group">

//                             <label>Date</label>

//                             <input
//                                 type="date"
//                                 name="date"
//                                 value={formData.date}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>


//                         {/* Time */}
//                         <div className="form-group">

//                             <label>Time</label>

//                             <input
//                                 type="time"
//                                 name="time"
//                                 value={formData.time}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>


//                         {/* Reason */}
//                         <div className="form-group full-width">

//                             <label>Reason for Visit</label>

//                             <textarea
//                                 name="reason"
//                                 value={formData.reason}
//                                 onChange={handleChange}
//                                 placeholder="Enter reason for appointment..."
//                                 rows="4"
//                                 required
//                             />

//                         </div>

//                     </div>


//                     <div className="appointment-actions">

//                         <button
//                             type="button"
//                             className="cancel-button"
//                             onClick={onClose}
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             className="book-button"
//                         >
//                             Book Appointment
//                         </button>

//                     </div>

//                 </form>

//             </div>

//         </div>
//     );
// }

// export default AddAppointment;
import { useEffect, useState } from "react";
import "./AddAppointment.css";

import { getDoctors } from "../../services/doctorService";
import { addAppointment } from "../../services/appointmentService";

function AddAppointment({ patient, onClose, onAppointmentBooked }) {

    const [doctors, setDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [booking, setBooking] = useState(false);

    const [formData, setFormData] = useState({
        patient_id: patient?.patient_id || "",
        patient_name: patient?.full_name || "",
        doctor_id: "",
        doctor_name: "",
        department: "",
        date: "",
        time: "",
        reason: ""
    });

    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const data = await getDoctors();

                console.log("DOCTORS:", data);

                setDoctors(data);

            } catch (error) {

                console.error("Error fetching doctors:", error);

            } finally {

                setLoadingDoctors(false);

            }
        };

        fetchDoctors();

    }, []);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleDoctorChange = (e) => {

        const selectedDoctorId = e.target.value;

        const selectedDoctor = doctors.find(
            (doctor) =>
                String(doctor.doctor_id) === String(selectedDoctorId)
        );

        if (!selectedDoctor) {

            setFormData((prev) => ({
                ...prev,
                doctor_id: "",
                doctor_name: "",
                department: ""
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            doctor_id: selectedDoctor.doctor_id,
            doctor_name: selectedDoctor.name,
            department: selectedDoctor.department
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setBooking(true);

            // Data sent to Django backend
            const appointmentData = {
                patient_id: patient.patient_id,
                doctor_id: formData.doctor_id,
                date: formData.date,
                time: formData.time,
                reason: formData.reason
            };

            console.log(
                "Sending Appointment:",
                appointmentData
            );

            const newAppointment =
                await addAppointment(appointmentData);

            console.log(
                "Appointment Created:",
                newAppointment
            );

            if (onAppointmentBooked) {
                onAppointmentBooked(newAppointment);
            }

            alert("Appointment booked successfully!");

            onClose();

        } catch (error) {

            console.error(
                "Error booking appointment:",
                error
            );

            alert("Failed to book appointment.");

        } finally {

            setBooking(false);

        }
    };

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const appointmentData = {
//         patient_id: formData.patient_id,
//         doctor_id: formData.doctor_id,
//         date: formData.date,
//         time: formData.time,
//         reason: formData.reason,
//     };

//     console.log("SENDING:", appointmentData);

//     try {

//         if (onAppointmentBooked) {
//             await onAppointmentBooked(appointmentData);
//         }

//         onClose();

//     } catch (error) {

//         console.error("FULL ERROR:", error);

//         console.error(
//             "BACKEND ERROR:",
//             error.response?.data
//         );

//     }
// };
    return (
        <div className="appointment-overlay">

            <div className="appointment-card">

                {/* Header */}
                <div className="appointment-header">

                    <div>
                        <h2>Book Appointment</h2>

                        <p>
                            Schedule an appointment for the patient
                        </p>
                    </div>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="appointment-form">

                        {/* Patient ID */}
                        <div className="form-group">

                            <label>Patient ID</label>

                            <input
                                type="text"
                                value={`P${String(
                                    formData.patient_id
                                ).padStart(3, "0")}`}
                                readOnly
                            />

                        </div>


                        {/* Patient Name */}
                        <div className="form-group">

                            <label>Patient Name</label>

                            <input
                                type="text"
                                value={formData.patient_name}
                                readOnly
                            />

                        </div>


                        {/* Doctor */}
                        <div className="form-group">

                            <label>Doctor</label>

                            <select
                                name="doctor_id"
                                value={formData.doctor_id}
                                onChange={handleDoctorChange}
                                required
                            >

                                <option value="">
                                    {loadingDoctors
                                        ? "Loading doctors..."
                                        : "Select Doctor"}
                                </option>

                                {doctors.map((doctor) => (

                                    <option
                                        key={doctor.doctor_id}
                                        value={doctor.doctor_id}
                                    >
                                        {doctor.name}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Department */}
                        <div className="form-group">

                            <label>Department</label>

                            <input
                                type="text"
                                value={formData.department}
                                placeholder="Department"
                                readOnly
                            />

                        </div>


                        {/* Date */}
                        <div className="form-group">

                            <label>Date</label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Time */}
                        <div className="form-group">

                            <label>Time</label>

                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Reason */}
                        <div className="form-group full-width">

                            <label>Reason for Visit</label>

                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Enter reason for appointment..."
                                rows="4"
                                required
                            />

                        </div>

                    </div>


                    {/* Actions */}
                    <div className="appointment-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            disabled={booking}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="book-button"
                            disabled={booking}
                        >
                            {booking
                                ? "Booking..."
                                : "Book Appointment"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddAppointment;