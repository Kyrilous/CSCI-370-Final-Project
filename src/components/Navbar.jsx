import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>RoomRadar QC</h2>

            <div style={styles.links}>
                <Link style={styles.links} to={"/"}>
                    Home
                </Link>

                <Link style={styles.links} to={"/find-rooms"}>
                    Find Rooms
                </Link>

                <Link style={styles.links} to={"/admin-login"}>
                    Admin Login
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#c02b2b",
        color: "#fff",
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
    },
    links: {   
        display: "flex",
        gap: "1rem",
        textDecoration: "none",
        color: "#fff",
    },
};

