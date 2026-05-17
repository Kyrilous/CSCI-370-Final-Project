function FindRooms() {
  return <h1>Find Available Rooms</h1>;
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "48px",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #fff7ed 100%)",
  },

  header: {
    maxWidth: "900px",
    margin: "0 auto 32px auto",
    textAlign: "center",
  },
  
  title: {
    textShadow: "4px 4px 3px rgba(0, 0, 0, 0.1)",
    color: "#c02b2b",

  },

  searchCard: {
    borderRadius: 4,
    boxShadow: 4,
    marginBottom: "40px",
    padding: "24px",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    alignItems: "center",

    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },

  timeInput: {
    "& .MuiInputLabel-root": {
      backgroundColor: "white",
      px: 0.5,
    },
  },

  searchButton: {
    marginTop: "24px",
    backgroundColor: "#dc2626",
    fontWeight: "bold",
    px: 4,
    py: 1.5,
    "&:hover": {
      backgroundColor: "#b91c1c",
    },
  },

  resultsSection: {
    maxWidth: "1200px",
    margin: "24px auto 0 auto",
    textAlign: "center",
  },

  roomsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "24px",

    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },

  roomCard: {
    borderRadius: 4,
    boxShadow: 3,
    height: "100%",
    textAlign: "left",
  },

  availableText: {
    marginTop: "12px",
    color: "#166534",
    fontWeight: "bold",
  },
};

export default FindRooms;