import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo} onClick={() => navigate("/products")}>
        🛍️ VibeAI
      </div>

      <div style={styles.links}>
        <Link to="/products" style={styles.link}>
          Products
        </Link>

        {user ? (
          <div style={styles.userSection}>
            <span style={styles.username}>Hi, {user.name}</span>
            <button onClick={onLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <div style={styles.authButtons}>
            <Link to="/login" style={styles.loginButton}>
              Login
            </Link>
            <Link to="/signup" style={styles.signupButton}>
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    transition: "opacity 0.2s",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  username: {
    fontWeight: "500",
  },
  logoutButton: {
    background: "rgba(255,255,255,0.2)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  authButtons: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  loginButton: {
    background: "rgba(255,255,255,0.2)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    textDecoration: "none",
    transition: "0.3s ease",
  },
  signupButton: {
    background: "white",
    color: "#764ba2",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "0.3s ease",
  },
};
