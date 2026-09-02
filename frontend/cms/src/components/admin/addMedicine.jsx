import { useState } from "react";
import "./AddMedicine.css";
import { addMedicine } from "../../services/medicineService";

function AddMedicine({ onClose, onMedicineAdded }) {

   const [formData, setFormData] = useState({
    medicine_name: "",
    medicine_type: "",
    manufacturer_name: "",
    manufacture_date: "",
    expiry_date: "",
    price_per_unit: "",
    stock_quantity: ""
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

        const data = await addMedicine({
            medicine_name: formData.medicine_name,
            medicine_type: formData.medicine_type,
            manufacturer_name: formData.manufacturer_name,
            manufacture_date: formData.manufacture_date,
            expiry_date: formData.expiry_date,
            price_per_unit: formData.price_per_unit,
            stock_quantity: formData.stock_quantity
        });

        console.log("Medicine Added:", data);

        if (onMedicineAdded) {
            onMedicineAdded(data);
        }

        onClose();

    } catch (error) {

        console.error(
            "BACKEND ERROR:",
            error.response?.data
        );

        alert(
            JSON.stringify(
                error.response?.data || "Something went wrong"
            )
        );

    } finally {

        setLoading(false);

    }
};


    return (
        <div className="add-medicine-overlay">

            <div className="add-medicine-card">

                {/* Header */}
                <div className="add-medicine-header">

                    <div>
                        <h2>Add Medicine</h2>

                        <p>
                            Enter medicine information
                        </p>
                    </div>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <div className="medicine-form">

                        {/* Medicine Name */}
                        <div className="form-group">

                            <label>
                                Medicine Name
                            </label>

                            <input
                                type="text"
                                name="medicine_name"
                            value={formData.medicine_name}
                                onChange={handleChange}
                                placeholder="Enter medicine name"
                                required
                            />

                        </div>


                        {/* Type */}
                        <div className="form-group">

                            <label>
                                Category / Type
                            </label>

                            <input
                                type="text"
                                name="medicine_type"
value={formData.medicine_type}
                                onChange={handleChange}
                                placeholder="e.g. Tablet, Syrup"
                                required
                            />

                        </div>


                        {/* Manufacturer */}
                        <div className="form-group full-width">

                            <label>
                                Manufacturer Name
                            </label>

                            <input
                                type="text"
                                name="manufacturer_name"
                                value={
                                    formData.manufacturer_name
                                }
                                onChange={handleChange}
                                placeholder="Enter manufacturer name"
                                required
                            />

                        </div>


                        {/* Manufacture Date */}
                        <div className="form-group">

                            <label>
                                Manufacture Date
                            </label>

                            <input
                                type="date"
                                name="manufacture_date"
                                value={
                                    formData.manufacture_date
                                }
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Expiry Date */}
                        <div className="form-group">

                            <label>
                                Expiry Date
                            </label>

                            <input
                                type="date"
                                name="expiry_date"
                                value={
                                    formData.expiry_date
                                }
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Price */}
                        <div className="form-group">

                            <label>
                                Price Per Unit
                            </label>

                            <input
                                type="number"
                                name="price_per_unit"
                                value={
                                    formData.price_per_unit
                                }
                                onChange={handleChange}
                                placeholder="Enter price"
                                min="0"
                                step="0.01"
                                required
                            />

                        </div>


                        {/* Stock */}
                        <div className="form-group">

                            <label>
                                Stock Quantity
                            </label>

                            <input
                                type="number"
                                name="stock_quantity"
                                value={
                                    formData.stock_quantity
                                }
                                onChange={handleChange}
                                placeholder="Enter quantity"
                                min="0"
                                required
                            />

                        </div>

                    </div>


                    {/* Actions */}
                    <div className="medicine-actions">

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
                                : "Add Medicine"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddMedicine;