import { useState } from "react";
import "./AddStaff.css";
import { addStaff } from "../../services/staffService";

function AddStaff({ onClose, onStaffAdded }) {

    const [formData, setFormData] = useState({
        name: "",
        date_of_birth: "",
        gender: "",
        blood_group: "",
        phone: "",
        email: "",
        address: "",
        emergency_contact: "",
        department: "",
        qualification: "",
        username: "",
        password: "",
        status: "Active"
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

        setError("");
        setLoading(true);

        try {

            const newStaff = await addStaff(formData);

            console.log("STAFF CREATED:", newStaff);

            // Send newly created staff back to StaffList
            if (onStaffAdded) {
                onStaffAdded(newStaff);
            }

            onClose();

        } catch (error) {

            console.error("Error adding staff:", error);

            if (error.response?.data) {
                setError(
                    JSON.stringify(error.response.data)
                );
            } else {
                setError("Failed to add staff. Please try again.");
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="add-staff-overlay">

            <div className="add-staff-card">

                {/* Header */}
                <div className="add-staff-header">

                    <h2>Add Staff</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter staff name"
                            value={formData.name}
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
                                name="date_of_birth"
                                value={formData.date_of_birth}
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
                                required
                            />

                        </div>

                    </div>

                    {/* Department */}
                    <div className="form-group">

                        <label>Department</label>

                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select department
                            </option>

                            <option value="Reception">
                                Reception
                            </option>

                            <option value="Pharmacy">
                                Pharmacy
                            </option>

                            <option value="Nursing">
                                Nursing
                            </option>

                            <option value="Lab">
                                Lab
                            </option>

                            <option value="Accounts">
                                Accounts
                            </option>

                            <option value="Admin">
                                Admin
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>

                    {/* Qualification */}
                    <div className="form-group">

                        <label>Qualification</label>

                        <input
                            type="text"
                            name="qualification"
                            placeholder="Enter qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Blood Group */}
                    <div className="form-group">

                        <label>Blood Group</label>

                        <select
                            name="blood_group"
                            value={formData.blood_group}
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
                        ></textarea>

                    </div>

                    {/* Emergency Contact */}
                    <div className="form-group">

                        <label>Emergency Contact</label>

                        <input
                            type="tel"
                            name="emergency_contact"
                            placeholder="Enter emergency contact"
                            value={formData.emergency_contact}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Username */}
                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Password */}
                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Status */}
                    <div className="form-group">

                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            <option value="Active">
                                Active
                            </option>

                            <option value="On Leave">
                                On Leave
                            </option>

                        </select>

                    </div>

                    {/* Error */}
                    {error && (
                        <p className="staff-error">
                            {error}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Staff"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddStaff;
