import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroText}>
          <p style={styles.badge}>Queens College Room Finder</p>

          <h1 style={styles.title}>Find Available Classrooms at Queens College</h1>

          <p style={styles.description}>
            RoomRadar QC helps students find classrooms that are not scheduled
            for class during a selected day and time.
          </p>

          <div style={styles.buttonGroup}>
            <Link to="/find-rooms" style={styles.primaryButton}>
              Find Rooms Now
            </Link>

            <a href="#how-it-works" style={styles.secondaryButton}>
              Learn More
            </a>
          </div>
        </div>

        <div style={styles.heroCard}>
          <h2 style={styles.cardTitle}>Quick Search Preview</h2>

          <div style={styles.previewRow}>
            <span>Day</span>
            <strong>Monday</strong>
          </div>

          <div style={styles.previewRow}>
            <span>Time</span>
            <strong>3:00 PM - 5:00 PM</strong>
          </div>

          <div style={styles.previewRow}>
            <span>Building</span>
            <strong>All Buildings</strong>
          </div>

          <div style={styles.availableBox}>
            <strong>PH 116</strong>
            <span>Available until 5:00 PM</span>
          </div>
        </div>
      </section>

      <section id="how-it-works" style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How It Works</h2>

        <div style={styles.stepsGrid}>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>1</div>
            <h3>Choose a Time</h3>
            <p>Select the day, start time, and end time you want to study.</p>
          </div>

          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>2</div>
            <h3>Filter by Building</h3>
            <p>Search all buildings or narrow results to a specific campus building.</p>
          </div>

          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>3</div>
            <h3>View Available Rooms</h3>
            <p>See rooms that do not have scheduled classes during your time range.</p>
          </div>
        </div>
      </section>

      <section style={styles.noteBox}>
        <strong>Note:</strong> Room availability is estimated using semester
        schedule data, not live occupancy.
      </section>
    </div>
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
  },

  description: {
    fontSize: "20px",
    lineHeight: "1.7",
    color: "#475569",
    marginBottom: "32px",
  },

  buttonGroup: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
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
  },
};

export default Home;