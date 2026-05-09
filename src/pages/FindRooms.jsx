import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const loadFindRoomsState = () => {
  try {
    const savedState = sessionStorage.getItem("findRoomsState");
    return savedState ? JSON.parse(savedState) : null;
  } catch {
    return null;
  }
};

const mockRooms = [
  {
    id: "1",
    room: "PH 116",
    building: "Powdermaker Hall",
    availableUntil: "5:00 PM",
  },
  {
    id: "2",
    room: "KY 243",
    building: "Kiely Hall",
    availableUntil: "6:15 PM",
  },
  {
    id: "3",
    room: "SB B145",
    building: "Science Building",
    availableUntil: "4:30 PM",
  },
];

function FindRooms() {
  const navigate = useNavigate();
  const savedState = loadFindRoomsState();

  const [day, setDay] = useState(savedState?.day || "");
  const [startTime, setStartTime] = useState(savedState?.startTime || "");
  const [endTime, setEndTime] = useState(savedState?.endTime || "");
  const [duration, setDuration] = useState(savedState?.duration || "1 hour");
  const [building, setBuilding] = useState(savedState?.building || "All Buildings");
  const [rooms, setRooms] = useState(savedState?.rooms || []);
  const [error, setError] = useState("");

  useEffect(() => {
    sessionStorage.setItem(
      "findRoomsState",
      JSON.stringify({
        day,
        startTime,
        endTime,
        duration,
        building,
        rooms,
      })
    );
  }, [day, startTime, endTime, duration, building, rooms]);

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
    setRooms(mockRooms);
  }

  return (
    <Box sx={styles.page}>
      <Box sx={styles.header}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={styles.title}>
          Find Available Rooms
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Select a day, time range, building, and duration to discover available rooms.
        </Typography>
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

              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={duration}
                  label="Duration"
                  onChange={(event) => setDuration(event.target.value)}
                >
                  <MenuItem value="1 hour">1 hour</MenuItem>
                  <MenuItem value="2 hours">2 hours</MenuItem>
                  <MenuItem value="3 hours">3 hours</MenuItem>
                  <MenuItem value="4 hours">4 hours</MenuItem>
                  <MenuItem value="5 hours">5 hours</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Start Time"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={styles.timeInput}
              />

              <TextField
                fullWidth
                label="End Time"
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                InputLabelProps={{ shrink: true }}
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

            <Button type="submit" variant="contained" size="large" sx={styles.searchButton}>
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

                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/rooms/${room.id}`, { state: { day } })}
                  >
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
