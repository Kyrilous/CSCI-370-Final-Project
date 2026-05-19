import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function Navbar() {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    Boolean(localStorage.getItem("adminToken"))
  );

  useEffect(() => {
    const updateAuth = () => {
      setIsAdminLoggedIn(Boolean(localStorage.getItem("adminToken")));
    };

    window.addEventListener("storage", updateAuth);
    window.addEventListener("adminAuthChange", updateAuth);

    return () => {
      window.removeEventListener("storage", updateAuth);
      window.removeEventListener("adminAuthChange", updateAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    window.dispatchEvent(new Event("adminAuthChange"));
    navigate("/");
  };

  return (
    <Box component="nav" sx={styles.navbar}>
      <Link to={"/"}>
        <h2 style={styles.logo}>RoomRadar QC</h2>
      </Link>

      <Box sx={styles.links}>
        <Link style={styles.link} to={"/"}>
          Home
        </Link>

        <Link style={styles.link} to={"/find-rooms"}>
          Find Rooms
        </Link>

        {!isAdminLoggedIn ? (
          <Link style={styles.link} to={"/admin-login"}>
            Admin Login
          </Link>
        ) : (
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    padding: "1rem 2rem",
    backgroundColor: "#c02b2b",
    color: "#fff",
    "@media (max-width: 600px)": {
      justifyContent: "center",
      padding: "0.85rem 1rem",
      textAlign: "center",
    },
  },
  links: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  logo: {
    margin: 0,
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    color: "#fff",
    background:
      "linear-gradient(to right, #1f1f1f, #8f2a3b96, #bdbcbc) padding-box, linear-gradient(to right, #000000, #E71939, #ffffff) border-box",
    border: "2px solid transparent",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  logoutButton: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.8)",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    cursor: "pointer",
    font: "inherit",
  },
};
