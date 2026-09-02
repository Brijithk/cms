// import "./Login.css";
// import logo from "../assets/hospital_logo.png";
// function Login() {
//     return (
//         <div className="login-page">

//             <div className="login-card">

//                 <div className="login-logo">
//                     <img src={logo} alt="Hospital" />
//                 </div>

//                 <h2>Kims</h2>
//                 <p>Clinical Management System</p>

//                 <form>
//                     <div className="input-group">
//                         <label>Username</label>
//                         <input
//                             type="text"
//                             placeholder="Enter username"
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             placeholder="Enter password"
//                         />
//                     </div>

//                     <button type="submit">
//                         Login
//                     </button>
//                 </form>

//             </div>

//         </div>
//     );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import logo from "../assets/hospital_logo.png";
import { loginUser } from "../services/loginService";
function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async(e) => {
        e.preventDefault();
//   navigate("/doctor/dashboard");
        if (username === "admin") {
              navigate("/admin/dashboard");
        }
        else {
             const data = await loginUser({
    username,
    password
});
localStorage.setItem("userId", data.id);
localStorage.setItem("userName", data.name);
localStorage.setItem("userRole", data.role);

if (data.doctor_id) {
    localStorage.setItem("doctorId", data.doctor_id);
}

if (data.staff_id) {
    localStorage.setItem("staffId", data.staff_id);
}
            if (data.role === "doctor") {
                        navigate("/doctor/dashboard");
                    }
                    else if (data.role === "reception") {
                        navigate("/receptionist/dashboard");
                    }
                    else if (data.role === "pharmacy") {
                        navigate("/pharmacist/dashboard");
                    }
                    else if (data.role === "lab") {
                        navigate("/lab-tech/dashboard");
                    }
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    <img src={logo} alt="Hospital" />
                </div>

                <h2>Kims</h2>
                <p>Clinical Management System</p>

                <form onSubmit={handleLogin}>

                    <div className="input-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;