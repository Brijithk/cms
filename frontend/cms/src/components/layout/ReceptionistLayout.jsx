// import Header from "../receptionist/Header";
import ReceptionistHeader from "../receptionist/ReceptionistHeader";
import ReceptionistSidebar from "../receptionist/ReceptionistSidebar";
import { Outlet } from "react-router-dom";
import "./ReceptionistLayout.css";

function ReceptionistLayout() {
    return (
        <div className="receptionist-layout">

            <ReceptionistHeader />

            <div className="receptionist-layout-body">

                <ReceptionistSidebar />

                <main className="receptionist-main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default ReceptionistLayout;