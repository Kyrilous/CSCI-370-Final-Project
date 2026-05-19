import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function Home() {
  return (
    <Box sx={styles.page}>
      <Box component="section" sx={styles.hero}>
        <Box sx={styles.heroText}>
          <p style={styles.badge}>Queens College Room Finder</p>

          <h1 style={styles.title}>Find Available Classrooms at Queens College</h1>

          <p style={styles.description}>
            RoomRadar QC helps students find classrooms that are not scheduled
            for class during a selected day and time.
          </p>

          <Box sx={styles.buttonGroup}>
            <Link to="/find-rooms" style={styles.primaryButton}>
              Find Rooms Now
            </Link>

            <a href="#how-it-works" style={styles.secondaryButton}>
              Learn More
            </a>
          </Box>
        </Box>

        <Box sx={styles.heroCard}>
          <h2 style={styles.cardTitle}>Quick Search Preview</h2>

          <Box sx={styles.previewRow}>
            <span>Day</span>
            <strong>Monday</strong>
          </Box>

          <Box sx={styles.previewRow}>
            <span>Time</span>
            <strong>3:00 PM - 5:00 PM</strong>
          </Box>

          <Box sx={styles.previewRow}>
            <span>Building</span>
            <strong>All Buildings</strong>
          </Box>

          <Box sx={styles.availableBox}>
            <strong>PH 116</strong>
            <span>Available until 5:00 PM</span>
          </Box>
        </Box>
      </Box>

      <Box component="section" id="how-it-works" sx={styles.howSection}>
        <h2 style={styles.sectionTitle}>How It Works</h2>

        <Box sx={styles.stepsGrid}>
          <Box sx={styles.stepCard}>
            <Box sx={styles.stepNumber}>1</Box>
            <h3>Choose a Time</h3>
            <p>Select the day, start time, and end time you want to study.</p>
          </Box>

          <Box sx={styles.stepCard}>
            <Box sx={styles.stepNumber}>2</Box>
            <h3>Filter by Building</h3>
            <p>Search all buildings or narrow results to a specific campus building.</p>
          </Box>

          <Box sx={styles.stepCard}>
            <Box sx={styles.stepNumber}>3</Box>
            <h3>View Available Rooms</h3>
            <p>See rooms that do not have scheduled classes during your time range.</p>
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={styles.noteBox}>
        <strong>Note:</strong> Room availability is based on course schedule data, not real-time occupancy. We cannot guarantee that a room will be unlocked or unoccupied. Results should be treated as suggestions, and students should always check the room in person before using it as a study space.
      </Box>
    </Box>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #fff7ed 100%)",
    color: "#1e293b",
  },

  hero: {
    display: "grid",
    gridTemplateColumns: "1.3fr 0.7fr",
    gap: "40px",
    alignItems: "center",
    padding: "80px 70px",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      padding: "40px 24px 32px",
    },
  },

  heroText: {
    maxWidth: "720px",
  },

  badge: {
    display: "inline-block",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    marginBottom: "18px",
  },

  title: {
    fontSize: "56px",
    lineHeight: "1.05",
    margin: "0 0 20px 0",
    color: "#0f172a",
    letterSpacing: "-1px",
    "@media (max-width: 600px)": {
      fontSize: "38px",
    },
  },

  description: {
    fontSize: "20px",
    lineHeight: "1.7",
    color: "#475569",
    marginBottom: "32px",
    "@media (max-width: 600px)": {
      fontSize: "17px",
    },
  },

  buttonGroup: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      alignItems: "stretch",
      width: "100%",
    },
  },

  primaryButton: {
    backgroundColor: "#dc2626",
    color: "white",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontWeight: "700",
    boxShadow: "0 10px 20px rgba(220, 38, 38, 0.25)",
  },

  secondaryButton: {
    backgroundColor: "white",
    color: "#1e293b",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontWeight: "700",
    border: "1px solid #cbd5e1",
  },

  heroCard: {
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
    border: "1px solid #e2e8f0",
    "@media (max-width: 600px)": {
      padding: "22px",
      marginTop: "24px",
    },
  },

  cardTitle: {
    marginTop: 0,
    marginBottom: "22px",
    color: "#0f172a",
  },

  previewRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #e2e8f0",
    color: "#475569",
  },

  availableBox: {
    marginTop: "24px",
    backgroundColor: "#e1ffea",
    border: "1px solid #bbf7d0",
    color: "#166534",
    padding: "18px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  howSection: {
    padding: "30px 70px 60px",
    "@media (max-width: 900px)": {
      padding: "24px 20px 40px",
    },
  },

  sectionTitle: {
    fontSize: "34px",
    marginBottom: "24px",
    color: "#0f172a",
  },

  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "22px",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },

  stepCard: {
    backgroundColor: "white",
    padding: "28px",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  },

  stepNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#dc2626",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    marginBottom: "16px",
  },

  noteBox: {
    margin: "0 70px 60px",
    backgroundColor: "#fffbeb",
    border: "1px solid #fde68a",
    color: "#92400e",
    padding: "18px 22px",
    borderRadius: "14px",
    "@media (max-width: 900px)": {
      margin: "0 20px 60px",
      padding: "16px 18px",
    },
  },
};

export default Home;