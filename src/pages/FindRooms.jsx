import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const mockRooms = [
  {
    id: 1,
    room: "PH 116",
    building: "Powdermaker Hall",
    availableUntil: "5:00 PM",
  },
  {
    id: 2,
    room: "KY 243",
    building: "Kiely Hall",
    availableUntil: "6:15 PM",
  },
  {
    id: 3,
    room: "SB B145",
    building: "Science Building",
    availableUntil: "4:30 PM",
  },
];

function FindRooms() {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("1 hour");
  const [building, setBuilding] = useState("All Buildings");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    if (!day || !startTime || !endTime) {
      setError("Please select a day, start time, and end time.");
      return;
    }

    if (startTime >= endTime) {
      setError("Start time must be before end time.");
      return;
    }

    setError("");

    // Temporary mock data until backend is ready
    setRooms(mockRooms);
  }

  return (
    <Box sx={styles.page}>
      <Box sx={styles.header}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={styles.title} >
          Find Available Rooms
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Select preferred room availability duration for current available rooms, or select a day and time range to find classrooms that are not scheduled
          for class.
        </Typography>
      </Box>

      <Box sx={styles.searchCard}>
       <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Duration</InputLabel>
              <Select
                  value={day}
                  label="Day"
                  onChange={(event) => setDay(event.target.value)}
                >
                  <MenuItem value="1 Hour">1 Hour</MenuItem>
                  <MenuItem value="2 Hours">2 Hours</MenuItem>
                  <MenuItem value="3 Hours">3 Hours</MenuItem>
                  <MenuItem value="4 Hours">4 Hours</MenuItem>
                  <MenuItem value="5 Hours">5 Hours</MenuItem>
              </Select>
          </FormControl>

        <Button variant="contained" sx={styles.searchButton}>
          Find Rooms Availible Now
        </Button>
        
      </Box>

      <Card sx={styles.searchCard}>
        <CardContent>
          <Box component="form" onSubmit={handleSearch}>
            <Box sx={styles.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Day</InputLabel>
                <Select
                  value={day}
                  label="Day"
                  onChange={(event) => setDay(event.target.value)}
                >
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Start Time"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={styles.timeInput}
              />

              <TextField
                fullWidth
                label="End Time"
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={styles.timeInput}
              />

              <FormControl fullWidth>
                <InputLabel>Building</InputLabel>
                <Select
                  value={building}
                  label="Building"
                  onChange={(event) => setBuilding(event.target.value)}
                >
                  <MenuItem value="All Buildings">All Buildings</MenuItem>
                  <MenuItem value="Powdermaker Hall">Powdermaker Hall</MenuItem>
                  <MenuItem value="Kiely Hall">Kiely Hall</MenuItem>
                  <MenuItem value="Science Building">Science Building</MenuItem>
                  <MenuItem value="Remsen Hall">Remsen Hall</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={styles.searchButton}
            >
              Search Rooms
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box sx={styles.resultsSection}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Available Rooms
        </Typography>

        {rooms.length === 0 ? (
          <Typography color="text.secondary">
            Enter a day and time range to find available rooms.
          </Typography>
        ) : (
          <Box sx={styles.roomsGrid}>
            {rooms.map((room) => (
              <Card sx={styles.roomCard} key={room.id}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {room.room}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Building: {room.building}
                  </Typography>

                  <Typography sx={styles.availableText}>
                    Available until: {room.availableUntil}
                  </Typography>

                  <Button variant="outlined" sx={{ mt: 2 }}>
                    View Schedule
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
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