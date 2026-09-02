import WelcomeCard from "../../components/doctor/WelcomeCard";
import StatCard from "../../components/doctor/StatCard";

import hospitalLogo from "../../assets/hospital-bed-icon.png";
import doctor_icon from "../../assets/doctor_icon.png";
import patient_icon from "../../assets/patient_icon.png";

import "./LabTechDashboard.css";

function LabTechDashboard() {
    return (
        <div>

            <div className="lab-tech-dashboard-top">

                <WelcomeCard />

                <div className="lab-tech-stats-container">

                    <StatCard
                        image={hospitalLogo}
                        title="Total Patients"
                        value="2,301"
                    />

                    <StatCard
                        image={doctor_icon}
                        title="Lab Tests"
                        value="156"
                    />

                    <StatCard
                        image={patient_icon}
                        title="Pending Tests"
                        value="89"
                    />

                </div>

            </div>

        </div>
    );
}

export default LabTechDashboard;
