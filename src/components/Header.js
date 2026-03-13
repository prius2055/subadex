import React from "react";
import { useAuth } from "./authContext";
import { useMenu } from "./MenuContext";

import "./../pages/Dashboard.css";

const Header = () => {
  const { logout, loggingOut } = useAuth();
  const { mobileMenu, toggleMobileMenu } = useMenu();

  const onMobileMenu = () => {
    toggleMobileMenu();
  };

  if (loggingOut) {
    return (
      <div className="logout-overlay">
        <div className="logout-card">
          <div className="logout-spinner" />
          <p className="logout-message">Signing you out...</p>
          <span className="logout-sub">See you next time 👋</span>
        </div>
      </div>
    );
  }

  return (
    <div className="top-header">
      <div
        className="mobile-menu-toggle"
        onClick={onMobileMenu}
        aria-label="Toggle menu"
      >
        {!mobileMenu ? "☰" : ""}
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
