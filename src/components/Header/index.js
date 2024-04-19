import React from "react";
import "./styles.css";

const Header = () => {
  const handleSignOut = () => {
    alert("singout?");
  };

  return (
    <div className="nav-bar">
      <h3>Rupee Tracker</h3>
      <p onClick={handleSignOut}>Sign Out</p>
    </div>
  );
};

export default Header;
