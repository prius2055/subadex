// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router";
// import { useAuth } from "../components/authContext";

// import "./Auth.css";
// import MarketerDashboard from "../components/MarketerDashboard";
// import Dashboard from "../components/Dashboard";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const { login, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect if already logged in
//     if (user) {
//       // console.log("✅ User already logged in, redirecting to dashboard...");
//       navigate("/dashboard");
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     // Validation
//     if (!username || !password) {
//       setError("Please fill in all fields");
//       setIsLoading(false);
//       return;
//     }

//     // Email validation
//     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     // if (!emailRegex.test(email)) {
//     //   setError("Please enter a valid email address");
//     //   setIsLoading(false);
//     //   return;
//     // }

//     // Call backend login
//     const result = await login(username.trim(), password.trim());

//     if (result.status) {
//       setError("");

//       setTimeout(() => {
//         navigate(result.user.role === "marketer" ? "/marketer" : "/dashboard");
//       }, 2000);
//     } else {
//       setError(result.message || "Invalid email or password");
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="loading">
//         <p>Signing you in...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h1 className="auth-brand">GEODNATECH</h1>
//         <h2 className="auth-title">Sign In</h2>

//         <div className="auth-form">
//           {error && (
//             <div
//               style={{
//                 padding: "12px",
//                 marginBottom: "20px",
//                 backgroundColor: "#fee2e2",
//                 color: "#dc2626",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 border: "1px solid #fecaca",
//               }}
//             >
//               {error}
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="email">Username*</label>
//             <input
//               type="username"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your Username"
//               autoComplete="Username"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password*</label>
//             <div className="password-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//           </div>

//           <div className="form-footer">
//             <Link className="forgot-link" to="/password/reset">
//               Forgot Password?
//             </Link>
//             <button
//               onClick={handleSubmit}
//               className="btn-submit"
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing In..." : "Sign In"}
//             </button>
//           </div>

//           <div className="auth-switch">
//             Don't have an account yet?
//             <Link to="/signup"> Sign Up</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../components/authContext";

import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // ── Redirect if already logged in ──
  useEffect(() => {
    if (user) {
      redirectByRole(user.role);
    }
  }, [user]);

  const redirectByRole = (role) => {
    if (role === "marketer") {
      navigate("/marketer");
    } else if (role === "superadmin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ── Validation ──
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(username.trim(), password.trim());

      if (result.status) {
        setError("");
        // Small delay so the user sees the loading state transition
        setTimeout(() => {
          redirectByRole(result.user.role);
        }, 800);
      } else {
        setError(result.message || "Invalid username or password.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  // ── Full-screen loading state ──
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner" />
        <p>Signing you in...</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-brand">GEODNATECH</h1>
        <h2 className="auth-title">Sign In</h2>

        <div className="auth-form">
          {/* ── Error Banner ── */}
          {error && (
            <div className="auth-error">
              <span className="auth-error-icon">⚠️</span>
              <span className="auth-error-text">{error}</span>
              <button
                type="button"
                className="auth-error-close"
                onClick={() => setError("")}
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}

          {/* ── Username ── */}
          <div className="form-group">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError(""); // clear error on change
              }}
              placeholder="Enter your username"
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          {/* ── Password ── */}
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(""); // clear error on change
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="form-footer">
            <Link className="forgot-link" to="/password/reset">
              Forgot Password?
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <div className="auth-switch">
            Don't have an account yet?
            <Link to="/signup"> Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
