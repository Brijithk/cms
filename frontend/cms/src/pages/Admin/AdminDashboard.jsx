import AdminWelcomeCard from "../../components/admin/AdminWelcomeCard";
import StatCard from "../../components/doctor/StatCard";

import hospitalLogo from "../../assets/hospital-bed-icon.png";
import doctor_icon from "../../assets/doctor_icon.png";
import patient_icon from "../../assets/patient_icon.png";

import "./AdminDashboard.css";

function AdminDashboard() {
    return (
        <div>

            <div className="admin-dashboard-top">

                <AdminWelcomeCard />

                <div className="admin-stats-container">

                    <StatCard
                        image={patient_icon}
                        title="Total Patients"
                        value="2,301"
                    />

                    <StatCard
                        image={doctor_icon}
                        title="Total Doctors"
                        value="45"
                    />

                    <StatCard
                        image={hospitalLogo}
                        title="Total Staff"
                        value="120"
                    />

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
