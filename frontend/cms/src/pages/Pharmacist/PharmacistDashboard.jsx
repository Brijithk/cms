import StatCard from "../../components/doctor/StatCard";
import PharmacistWelcomeCard from "../../components/pharmacist/PharmacistWelcomeCard";
import hospitalLogo from "../../assets/hospital-bed-icon.png";
import medicine_icon from "../../assets/doctor_icon.png";
import patient_icon from "../../assets/patient_icon.png";

import "./PharmacistDashboard.css";

function PharmacistDashboard() {
    return (
        <div>

            <div className="pharmacist-dashboard-top">

                <PharmacistWelcomeCard />

                <div className="pharmacist-stats-container">

                    <StatCard
                        image={hospitalLogo}
                        title="Total Patients"
                        value="2,301"
                    />

                    <StatCard
                        image={medicine_icon}
                        title="Prescriptions"
                        value="156"
                    />

                    <StatCard
                        image={patient_icon}
                        title="Pending Orders"
                        value="89"
                    />

                </div>

            </div>

        </div>
    );
}

export default PharmacistDashboard;