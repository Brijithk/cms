import { useState } from "react";
import "./BillingRecords.css";

function BillingRecords() {
    const [searchTerm, setSearchTerm] = useState("");

    // Sample billing data
    const [billingRecords] = useState([
        {
            bill_id: "BILL001",
            patient_id: 1,
            medicines: ["Paracetamol", "Amoxicillin"],
            amount: 250,
            payment: "Paid",
            method: "UPI",
        },
        {
            bill_id: "BILL002",
            patient_id: 2,
            medicines: ["Cetirizine"],
            amount: 120,
            payment: "Pending",
            method: "-",
        },
        {
            bill_id: "BILL003",
            patient_id: 3,
            medicines: ["Azithromycin", "Paracetamol"],
            amount: 350,
            payment: "Paid",
            method: "Card",
        },
    ]);

    // Search
    const filteredRecords = billingRecords.filter((bill) => {
        const search = searchTerm.toLowerCase();

        return (
            bill.bill_id.toLowerCase().includes(search) ||
            `P${String(bill.patient_id).padStart(3, "0")}`
                .toLowerCase()
                .includes(search) ||
            bill.medicines.some((medicine) =>
                medicine.toLowerCase().includes(search)
            ) ||
            bill.payment.toLowerCase().includes(search) ||
            bill.method.toLowerCase().includes(search)
        );
    });

    return (
        <div className="billing-section">

            {/* Search */}
            <div className="billing-controls">

                <div className="billing-search-container">

                    <span className="billing-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search billing records..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* Table */}
            <div className="billing-table-container">

                <table>

                    <thead>
                        <tr>
                            <th>Bill ID</th>
                            <th>Patient</th>
                            <th>Medicines</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Method</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredRecords.length > 0 ? (

                            filteredRecords.map((bill) => (

                                <tr key={bill.bill_id}>

                                    {/* Bill ID */}
                                    <td>
                                        {bill.bill_id}
                                    </td>

                                    {/* Patient */}
                                    <td>
                                        P
                                        {String(
                                            bill.patient_id
                                        ).padStart(3, "0")}
                                    </td>

                                    {/* Medicines */}
                                    <td>
                                        {bill.medicines.join(", ")}
                                    </td>

                                    {/* Amount */}
                                    <td>
                                        ₹{bill.amount}
                                    </td>

                                    {/* Payment */}
                                    <td>

                                        <span
                                            className={`billing-status ${
                                                bill.payment.toLowerCase()
                                            }`}
                                        >
                                            {bill.payment}
                                        </span>

                                    </td>

                                    {/* Method */}
                                    <td>
                                        {bill.method}
                                    </td>

                                    {/* Action */}
                                    <td>

                                        <button
                                            className="billing-action-button"
                                            onClick={() =>
                                                console.log(
                                                    "View bill:",
                                                    bill.bill_id
                                                )
                                            }
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="no-billing-records"
                                >
                                    No billing records found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default BillingRecords;
