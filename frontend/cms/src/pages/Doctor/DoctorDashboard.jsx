import WelcomeCard from "../../components/doctor/WelcomeCard";
import PatientTable from "../../components/doctor/PatientTable";
import StatCard from "../../components/doctor/StatCard";
import hospitalLogo from "../../assets/hospital-bed-icon.png";
import doctor_icon from "../../assets/doctor_icon.png"
import patient_icon from "../../assets/patient_icon.png"
import "./DoctorDashboard.css";

function DoctorDashboard() {
    return (
        <div>
        <div className="dashboard-top">

            <WelcomeCard />

            <div className="stats-container">

                <StatCard
                    image={hospitalLogo}
                    title="Total Patients"
                    value="2,301"
                />

                <StatCard
                    image={doctor_icon}
                    title="Appointments"
                    value="156"
                />

                <StatCard
                    image={patient_icon}
                    title="Consultations"
                    value="89"
                />

            </div>

        </div>

      
        </div>
    );
}

export default DoctorDashboard;