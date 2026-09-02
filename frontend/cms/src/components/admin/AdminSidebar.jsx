
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

import dashboardIcon from "../../assets/dashboard.png";
import patientsIcon from "../../assets/online-booking.png";

function AdminSidebar() {
    return (
        <aside className="admin-sidebar">

            <nav className="admin-sidebar-menu">

                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={dashboardIcon} alt="" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin/staff"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Staff List</span>
                </NavLink>

                <NavLink
                    to="/admin/doctors"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Doctor List</span>
                </NavLink>

                <NavLink
                    to="/admin/medicines"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Medicine List</span>
                </NavLink>
          {/* /admin/tests */}
            <NavLink
                    to="/admin/tests"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Lab Test List</span>
                </NavLink>
            </nav>

        </aside>
    );
}

export default AdminSidebar;

