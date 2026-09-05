import { useEffect, useState } from "react";
import "./BillingRecords.css";
import { getBills } from "../../services/billService";

function BillingRecords() {

    const [searchTerm, setSearchTerm] = useState("");
    const [billingRecords, setBillingRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBillingRecords = async () => {

            try {

                const data = await getBills();

                console.log("BILLING RECORDS:", data);

                setBillingRecords(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Error fetching billing records:",
                    error.response?.data || error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchBillingRecords();

    }, []);


    // Search
    const filteredRecords = billingRecords.filter((bill) => {

        const search =
            searchTerm.toLowerCase();

        const billId =
            String(
                bill.bill_id || ""
            ).toLowerCase();

        const patientId =
            `P${String(
                bill.patient_id || ""
            ).padStart(3, "0")}`.toLowerCase();

        const paymentStatus =
            String(
                bill.payment_status || ""
            ).toLowerCase();

        const paymentMethod =
            String(
                bill.payment_method || ""
            ).toLowerCase();

        return (
            billId.includes(search) ||
            patientId.includes(search) ||
            paymentStatus.includes(search) ||
            paymentMethod.includes(search)
        );

    });


    const formatBillId = (id) => {

        if (!id) {
            return "-";
        }

        return `BILL${String(id).padStart(3, "0")}`;

    };


    const formatPatientId = (id) => {

        if (!id) {
            return "-";
        }

        return `P${String(id).padStart(3, "0")}`;

    };


    const formatAmount = (amount) => {

        return Number(
            amount || 0
        ).toFixed(2);

    };


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


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
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>


            {/* Loading */}

            {loading ? (

                <p>
                    Loading billing records...
                </p>

            ) : (

                <div className="billing-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Bill ID
                                </th>

                                <th>
                                    Patient
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Payment
                                </th>

                                <th>
                                    Method
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredRecords.length > 0 ? (

                                filteredRecords.map(
                                    (bill) => (

                                        <tr
                                            key={
                                                bill.bill_id
                                            }
                                        >

                                            {/* Bill ID */}

                                            <td>
                                                {
                                                    formatBillId(
                                                        bill.bill_id
                                                    )
                                                }
                                            </td>


                                            {/* Patient */}

                                            <td>
                                                {
                                                    formatPatientId(
                                                        bill.patient_id
                                                    )
                                                }
                                            </td>


                                            {/* Amount */}

                                            <td>
                                                ₹
                                                {
                                                    formatAmount(
                                                        bill.amount
                                                    )
                                                }
                                            </td>


                                            {/* Payment */}

                                            <td>

                                                <span
                                                    className={`billing-status ${
                                                        String(
                                                            bill.payment_status ||
                                                            ""
                                                        ).toLowerCase()
                                                    }`}
                                                >

                                                    {
                                                        bill.payment_status ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* Method */}

                                            <td>
                                                {
                                                    bill.payment_method ||
                                                    "-"
                                                }
                                            </td>


                                            {/* Date */}

                                            <td>
                                                {
                                                    formatDate(
                                                        bill.created_at ||
                                                        bill.bill_date
                                                    )
                                                }
                                            </td>


                                            {/* Action */}

                                            <td>

                                                <button
                                                    className="billing-action-button"
                                                    onClick={() =>
                                                        console.log(
                                                            "View bill:",
                                                            bill
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )

                                )

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

            )}

        </div>

    );

}

export default BillingRecords;