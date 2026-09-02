import { useState } from "react";
import "./AddTest.css";
import { addTest } from "../../services/testService";
function AddTest({ onClose, onTestAdded }) {

    const [formData, setFormData] = useState({
        test_name: "",
        normal_range: "",
        sample_required: "",
        unit: "",
        department: "",
        tat: "",
        price: "",
        description: "",
        status: "Available"
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


 const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        const data = await addTest({
            test_name: formData.test_name,
            normal_range: formData.normal_range,
            sample_required: formData.sample_required,
            unit: formData.unit,
            department: formData.department,
            tat: formData.tat,
            price: formData.price,
            description: formData.description
        });

        console.log("Test Added:", data);

        if (onTestAdded) {
            onTestAdded(data);
        }

        onClose();

    } catch (error) {

        console.error(
            "STATUS:",
            error.response?.status
        );

        console.error(
            "BACKEND ERROR:",
            error.response?.data
        );

        alert(
            JSON.stringify(
                error.response?.data ||
                "Something went wrong"
            )
        );

    } finally {

        setLoading(false);

    }
};


    return (
        <div className="add-test-overlay">

            <div className="add-test-card">

                {/* Header */}
                <div className="add-test-header">

                    <div>

                        <h2>Add Lab Test</h2>

                        <p>
                            Enter laboratory test information
                        </p>

                    </div>

                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <div className="test-form">


                        {/* Test ID */}
                        <div className="form-group">

                            <label>
                                Test ID
                            </label>

                            <input
                                type="text"
                                value="Auto Generated"
                                readOnly
                            />

                        </div>


                        {/* Test Name */}
                        <div className="form-group">

                            <label>
                                Test Name
                            </label>

                            <input
                                type="text"
                                name="test_name"
                                value={formData.test_name}
                                onChange={handleChange}
                                placeholder="Enter test name"
                                required
                            />

                        </div>


                        {/* Normal Range */}
                        <div className="form-group">

                            <label>
                                Normal Range
                            </label>

                            <input
                                type="text"
                                name="normal_range"
                                value={formData.normal_range}
                                onChange={handleChange}
                                placeholder="e.g. 70 - 100"
                                required
                            />

                        </div>


                        {/* Sample Required */}
                        <div className="form-group">

                            <label>
                                Sample Required
                            </label>

                            <input
                                type="text"
                                name="sample_required"
                                value={formData.sample_required}
                                onChange={handleChange}
                                placeholder="e.g. Blood"
                                required
                            />

                        </div>


                        {/* Unit */}
                        <div className="form-group">

                            <label>
                                Unit
                            </label>

                            <input
                                type="text"
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                placeholder="e.g. mg/dL"
                                required
                            />

                        </div>


                        {/* Department */}
                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Department
                                </option>

                                <option value="Hematology">
                                    Hematology
                                </option>

                                <option value="Biochemistry">
                                    Biochemistry
                                </option>

                                <option value="Microbiology">
                                    Microbiology
                                </option>

                                <option value="Pathology">
                                    Pathology
                                </option>

                                <option value="Immunology">
                                    Immunology
                                </option>

                                <option value="Radiology">
                                    Radiology
                                </option>

                            </select>

                        </div>


                        {/* TAT */}
                        <div className="form-group">

                            <label>
                                TAT
                            </label>

                            <input
                                type="text"
                                name="tat"
                                value={formData.tat}
                                onChange={handleChange}
                                placeholder="e.g. 2 Hours"
                                required
                            />

                        </div>


                        {/* Price */}
                        <div className="form-group">

                            <label>
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                min="0"
                                step="0.01"
                                required
                            />

                        </div>


                        {/* Description */}
                        <div className="form-group full-width">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter test description..."
                                rows="4"
                            />

                        </div>


                        {/* Status */}
                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option value="Available">
                                    Available
                                </option>

                                <option value="Maintenance">
                                    Maintenance
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* Actions */}
                    <div className="test-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="add-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Adding..."
                                : "Add Test"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddTest;
