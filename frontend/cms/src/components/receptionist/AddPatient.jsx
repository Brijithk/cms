import { useState } from "react";
import "./AddPatient.css";
import { addPatient } from "../../services/patientService";

function AddPatient({ onClose, onPatientAdded }) {

    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        bloodGroup: "",
        address: "",
        emergencyContact: "",
        allergies: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const patientData = {
            full_name: formData.fullName,
            date_of_birth: formData.dateOfBirth,
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            blood_group: formData.bloodGroup,
            address: formData.address,
            emergency_contact: formData.emergencyContact,
            allergies: formData.allergies
        };

        try {

            const newPatient = await addPatient(patientData);

            console.log("Patient added:", newPatient);

            // Tell PatientList that a new patient was added
            if (onPatientAdded) {
                onPatientAdded(newPatient);
            }

            onClose();

        } catch (error) {

            console.error("Error adding patient:", error);

            setError(
                error.response?.data
                    ? JSON.stringify(error.response.data)
                    : "Failed to add patient"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-patient-overlay">

            <div className="add-patient-card">

                <div className="add-patient-header">

                    <h2>Add Patient</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Full Name */}
                    <div className="form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-row">

                        {/* Date of Birth */}
                        <div className="form-group">

                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Gender */}
                        <div className="form-group">

                            <label>Gender</label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="form-row">

                        {/* Phone */}
                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Email */}
                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* Blood Group */}
                    <div className="form-group">

                        <label>Blood Group</label>

                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select blood group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>

                        </select>

                    </div>


                    {/* Address */}
                    <div className="form-group">

                        <label>Address</label>

                        <textarea
                            name="address"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                        />

                    </div>


                    {/* Emergency Contact */}
                    <div className="form-group">

                        <label>Emergency Contact</label>

                        <input
                            type="tel"
                            name="emergencyContact"
                            placeholder="Enter emergency contact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Allergies */}
                    <div className="form-group">

                        <label>Allergies</label>

                        <textarea
                            name="allergies"
                            placeholder="Enter allergies, if any"
                            value={formData.allergies}
                            onChange={handleChange}
                            rows="3"
                        />

                    </div>


                    {/* Buttons */}
                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Patient"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddPatient;