import React, { useState, useEffect } from "react";
import "../styles/trial.css";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document
      .querySelectorAll(".nav-link")
      .forEach((n) => n.addEventListener("click", () => {}));

    // Cleanup the event listener on component unmount
    return () => {
      hamburger.removeEventListener("click", () => {});
      document
        .querySelectorAll(".nav-link")
        .forEach((n) => n.removeEventListener("click", () => {}));
    };
  }, []);

  return (
    <nav className="navbar">
      <a href="#" className="nav-branding">
        Dev
      </a>
      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Bulk Orders
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Navbar;
