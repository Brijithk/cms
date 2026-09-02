import { NavLink } from "react-router-dom";
import "./PharmacistSidebar.css";

import dashboardIcon from "../../assets/dashboard.png";
import patientsIcon from "../../assets/online-booking.png";

function PharmacistSidebar() {
    return (
        <aside className="pharmacist-sidebar">

            <nav className="pharmacist-sidebar-menu">

                <NavLink
                    to="/pharmacist/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "pharmacist-menu-item active"
                            : "pharmacist-menu-item"
                    }
                >
                    <img src={dashboardIcon} alt="" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/pharmacist/prescriptions"
                    className={({ isActive }) =>
                        isActive
                            ? "pharmacist-menu-item active"
                            : "pharmacist-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Prescriptions</span>
                </NavLink>

                <NavLink
                    to="/pharmacist/inventory"
                    className={({ isActive }) =>
                        isActive
                            ? "pharmacist-menu-item active"
                            : "pharmacist-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Inventory</span>
                </NavLink>

                <NavLink
                    to="/pharmacist/billing"
                    className={({ isActive }) =>
                        isActive
                            ? "pharmacist-menu-item active"
                            : "pharmacist-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Billing</span>
                </NavLink>

            </nav>

        </aside>
    );
}

export default PharmacistSidebar;
