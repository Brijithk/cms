// import { useState } from "react";
// import "./AddDoctor.css";
// import { addDoctor } from "../../services/doctorService";

// function AddDoctor({ onClose, onDoctorAdded }) {

//     const [formData, setFormData] = useState({
//         name: "",
//         department: "",
//         fees: "",
//         username: "",
//         password: "",
//         date_of_birth: "",
//         gender: "",
//         phone: "",
//         email: "",
//         blood_group: "",
//         address: "",
//         emergency_contact: "",
//         experience: ""
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             setLoading(true);

//             const newDoctor = await addDoctor(formData);

//             console.log("Doctor added:", newDoctor);

//             onDoctorAdded(newDoctor);

//             onClose();

//         } catch (error) {

//             console.error("Error adding doctor:", error);

//             if (error.response) {
//                 console.log("Status:", error.response.status);
//                 console.log("Response:", error.response.data);
//             }

//             alert("Failed to add doctor");

//         } finally {

//             setLoading(false);

//         }
//     };

//     return (
//         <div className="add-doctor-overlay">

//             <div className="add-doctor-card">

//                 {/* Header */}
//                 <div className="add-doctor-header">

//                     <h2>Add Doctor</h2>

//                     <button
//                         className="close-button"
//                         onClick={onClose}
//                     >
//                         ×
//                     </button>

//                 </div>

//                 <form onSubmit={handleSubmit}>

//                     {/* Name */}
//                     <div className="form-group">
//                         <label>Doctor Name</label>

//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Enter doctor name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>


//                     {/* Department + Fees */}
//                     <div className="form-row">

//                         <div className="form-group">

//                             <label>Department</label>

//                             <input
//                                 type="text"
//                                 name="department"
//                                 placeholder="Enter department"
//                                 value={formData.department}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Fees</label>

//                             <input
//                                 type="number"
//                                 name="fees"
//                                 placeholder="Enter consultation fees"
//                                 value={formData.fees}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                     </div>


//                     {/* Username + Password */}
//                     <div className="form-row">

//                         <div className="form-group">

//                             <label>Username</label>

//                             <input
//                                 type="text"
//                                 name="username"
//                                 placeholder="Enter username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Password</label>

//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                     </div>


//                     {/* Date of Birth + Gender */}
//                     <div className="form-row">

//                         <div className="form-group">

//                             <label>Date of Birth</label>

//                             <input
//                                 type="date"
//                                 name="date_of_birth"
//                                 value={formData.date_of_birth}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Gender</label>

//                             <select
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">
//                                     Select gender
//                                 </option>

//                                 <option value="Male">
//                                     Male
//                                 </option>

//                                 <option value="Female">
//                                     Female
//                                 </option>

//                                 <option value="Other">
//                                     Other
//                                 </option>

//                             </select>

//                         </div>

//                     </div>


//                     {/* Phone + Email */}
//                     <div className="form-row">

//                         <div className="form-group">

//                             <label>Phone</label>

//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 placeholder="Enter phone number"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Email</label>

//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                     </div>


//                     {/* Blood Group */}
//                     <div className="form-group">

//                         <label>Blood Group</label>

//                         <select
//                             name="blood_group"
//                             value={formData.blood_group}
//                             onChange={handleChange}
//                         >

//                             <option value="">
//                                 Select blood group
//                             </option>

//                             <option value="A+">A+</option>
//                             <option value="A-">A-</option>
//                             <option value="B+">B+</option>
//                             <option value="B-">B-</option>
//                             <option value="AB+">AB+</option>
//                             <option value="AB-">AB-</option>
//                             <option value="O+">O+</option>
//                             <option value="O-">O-</option>

//                         </select>

//                     </div>


//                     {/* Address */}
//                     <div className="form-group">

//                         <label>Address</label>

//                         <textarea
//                             name="address"
//                             placeholder="Enter address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             rows="3"
//                         ></textarea>

//                     </div>


//                     {/* Emergency Contact */}
//                     <div className="form-group">

//                         <label>Emergency Contact</label>

//                         <input
//                             type="tel"
//                             name="emergency_contact"
//                             placeholder="Enter emergency contact"
//                             value={formData.emergency_contact}
//                             onChange={handleChange}
//                         />

//                     </div>


//                     {/* Experience */}
//                     <div className="form-group">

//                         <label>Experience</label>

//                         <input
//                             type="text"
//                             name="experience"
//                             placeholder="e.g. 5 years"
//                             value={formData.experience}
//                             onChange={handleChange}
//                         />

//                     </div>


//                     {/* Buttons */}
//                     <div className="form-actions">

//                         <button
//                             type="button"
//                             className="cancel-button"
//                             onClick={onClose}
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             className="save-button"
//                             disabled={loading}
//                         >
//                             {loading ? "Adding..." : "Add Doctor"}
//                         </button>

//                     </div>

//                 </form>

//             </div>

//         </div>
//     );
// }

// export default AddDoctor;

import { useState } from "react";
import "./AddDoctor.css";
import { addDoctor } from "../../services/doctorService";

function AddDoctor({ onClose, onDoctorAdded }) {

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        fees: "",
        experience: "",
        username: "",
        password: "",
        date_of_birth: "",
        gender: "",
        phone: "",
        email: "",
        blood_group: "",
        address: "",
        emergency_contact: ""
    });

    const [loading, setLoading] = useState(false);

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

            setLoading(true);

            const newDoctor = await addDoctor(formData);

            console.log("Doctor added:", newDoctor);

            onDoctorAdded(newDoctor);

            onClose();

        } catch (error) {

            console.error("Error adding doctor:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
            }

            alert("Failed to add doctor");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="add-doctor-overlay">

            <div className="add-doctor-card">

                <div className="add-doctor-header">

                    <h2>Add Doctor</h2>

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

                        <label>Doctor Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter doctor name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Department + Fees */}
                    <div className="form-row">

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

                                <option value="Cardiology">
                                    Cardiology
                                </option>

                                <option value="Neurology">
                                    Neurology
                                </option>

                                <option value="Orthopedics">
                                    Orthopedics
                                </option>

                                <option value="Pediatrics">
                                    Pediatrics
                                </option>

                                <option value="Dermatology">
                                    Dermatology
                                </option>

                                <option value="General Medicine">
                                    General Medicine
                                </option>

                                <option value="General Surgery">
                                    General Surgery
                                </option>

                                <option value="Gynecology">
                                    Gynecology
                                </option>

                                <option value="ENT">
                                    ENT
                                </option>

                                <option value="Ophthalmology">
                                    Ophthalmology
                                </option>

                                <option value="Dentistry">
                                    Dentistry
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>Fees</label>

                            <input
                                type="number"
                                name="fees"
                                placeholder="Enter consultation fees"
                                value={formData.fees}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />

                        </div>

                    </div>


                    {/* Experience + Username */}
                    <div className="form-row">

                        <div className="form-group">

                            <label>Experience (Years)</label>

                            <input
                                type="number"
                                name="experience"
                                placeholder="Enter experience"
                                value={formData.experience}
                                onChange={handleChange}
                                min="0"
                                required
                            />

                        </div>


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


                    {/* DOB + Gender */}
                    <div className="form-row">

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


                    {/* Phone + Email */}
                    <div className="form-row">

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
                            {loading ? "Adding..." : "Add Doctor"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddDoctor;