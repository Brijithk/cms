

import { useEffect, useState } from "react";
import "./StaffList.css";
import AddStaff from "./AddStaff";
import EditStaff from "./EditStaff";
import { getStaff, deleteStaff } from "../../services/staffService";

function StaffList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddStaff, setShowAddStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
    // Fetch staff from backend
    useEffect(() => {

        const fetchStaff = async () => {

            try {

                const data = await getStaff();

                console.log("STAFF API DATA:", data);

                setStaff(data);

            } catch (error) {

                console.error("Error fetching staff:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchStaff();

    }, []);

    // Search
    const filteredStaff = staff.filter((member) => {

        const search = searchTerm.toLowerCase();

        return (
            String(member.staff_id)
                .toLowerCase()
                .includes(search) ||

            String(member.name)
                .toLowerCase()
                .includes(search) ||

            String(member.department)
                .toLowerCase()
                .includes(search) ||

            String(member.phone)
                .toLowerCase()
                .includes(search)
        );
    });

    const handleAddStaff = () => {
        console.log("Add Staff clicked");
    };

 const handleEditStaff = (member) => {
    setSelectedStaff(member);
};
   const handleDeleteStaff = async (member) => {

    const confirmDelete = window.confirm(
        `Are you sure you want to delete ${member.name}?`
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await deleteStaff(member.id);

        // Remove from UI after successful backend deletion
        setStaff((prevStaff) =>
            prevStaff.filter(
                (staffMember) => staffMember.id !== member.id
            )
        );

        console.log("Staff deleted successfully");

    } catch (error) {

        console.error("Error deleting staff:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);
        }

        alert("Failed to delete staff");
    }
};

    return (
        <div className="staff-section">

            {/* Add Staff + Search */}
            <div className="staff-controls">

                <button
                    className="add-staff-button"
                    onClick={() => setShowAddStaff(true)}
                >
                    <span>+</span>
                    Add Staff
                </button>

                <div className="staff-search-container">

                    <span className="staff-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search staff..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* Loading */}
            {loading ? (

                <p>Loading staff...</p>

            ) : (

                /* Staff Table */
                <div className="staff-table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Staff ID</th>
                                <th>Staff Name</th>
                                <th>Department</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredStaff.length > 0 ? (

                                filteredStaff.map((member) => (

                                    <tr key={member.staff_id}>

                                        {/* Staff ID */}
                                        <td>
                                            {member.staff_id}
                                        </td>

                                        {/* Name */}
                                        <td>
                                            {member.name}
                                        </td>

                                        {/* Department */}
                                        <td>
                                            {member.department}
                                        </td>

                                        {/* Phone */}
                                        <td>
                                            {member.phone}
                                        </td>

                                        {/* Status */}
                                        <td>

                                            <span
                                                className={`staff-status ${
                                                    member.status
                                                        ?.toLowerCase()
                                                        .replace(" ", "-")
                                                }`}
                                            >
                                                {member.status}
                                            </span>

                                        </td>

                                        {/* Actions */}
                                        <td>

                                            <div className="staff-action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        handleEditStaff(member)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleDeleteStaff(member)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="no-staff"
                                    >
                                        No staff found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}
       {showAddStaff && (
    <AddStaff
        onClose={() => setShowAddStaff(false)}
        onStaffAdded={(newStaff) => {
            setStaff((prevStaff) => [
                ...prevStaff,
                newStaff
            ]);
        }}
    />
)}

{selectedStaff && (
    <EditStaff
        staff={selectedStaff}
        onClose={() => setSelectedStaff(null)}
        onStaffUpdated={(updatedStaff) => {
            setStaff((prevStaff) =>
                prevStaff.map((member) =>
                    member.staff_id === updatedStaff.staff_id
                        ? updatedStaff
                        : member
                )
            );
        }}
    />
)}
        </div>
    );
}

export default StaffList;
