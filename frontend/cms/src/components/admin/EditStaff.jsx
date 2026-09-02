import { useState } from "react";
import "./EditStaff.css";
import { updateStaff } from "../../services/staffService";
function EditStaff({ staff, onClose, onStaffUpdated }) {

    const [formData, setFormData] = useState({
        name: staff.name || "",
        date_of_birth: staff.date_of_birth || "",
        gender: staff.gender || "",
        blood_group: staff.blood_group || "",
        phone: staff.phone || "",
        email: staff.email || "",
        address: staff.address || "",
        emergency_contact: staff.emergency_contact || "",
        department: staff.department || "",
        qualification: staff.qualification || "",
        username: staff.username || "",
        password: staff.password || ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        console.log("STAFF ID:", staff.id);
        console.log("DATA SENT:", formData);

        const updatedStaff = await updateStaff(
            staff.id,
            formData
        );

        console.log("UPDATED STAFF:", updatedStaff);

        if (onStaffUpdated) {
            onStaffUpdated(updatedStaff);
        }

        onClose();

    } catch (error) {

        console.error("UPDATE ERROR:", error);

        if (error.response) {
            console.log("STATUS:", error.response.status);
            console.log("RESPONSE:", error.response.data);
        }

        alert("Failed to update staff");

    }
};

    return (
        <div className="edit-staff-overlay">

            <div className="edit-staff-card">

                {/* Header */}

                <div className="edit-staff-header">

                    <h2>Edit Staff</h2>

                    <button
                        className="edit-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Staff ID */}

                    <div className="edit-form-group">

                        <label>Staff ID</label>

                        <input
                            type="text"
                            value={staff.staff_id}
                            disabled
                        />

                    </div>


                    {/* Name */}

                    <div className="edit-form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* DOB + Gender */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="edit-form-group">

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


                    {/* Phone + Email */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

                            <label>Phone</label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="edit-form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* Department + Qualification */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

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


                        <div className="edit-form-group">

                            <label>Qualification</label>

                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* Blood Group */}

                    <div className="edit-form-group">

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

                    <div className="edit-form-group">

                        <label>Address</label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                        />

                    </div>


                    {/* Emergency Contact */}

                    <div className="edit-form-group">

                        <label>Emergency Contact</label>

                        <input
                            type="tel"
                            name="emergency_contact"
                            value={formData.emergency_contact}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Username */}

                    <div className="edit-form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="edit-form-group">

                        <label>Password</label>

                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Buttons */}

                    <div className="edit-form-actions">

                        <button
                            type="button"
                            className="edit-cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="edit-save-button"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditStaff;
