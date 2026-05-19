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

const buildingMap = {
  "Powdermaker Hall": "PH",
  "Kiely Hall": "KY",
  "Science Building": "SB",
  "Remsen Hall": "RE",

  "Art Building": "AR",
  "CD Building": "CD",
  "Colwin Hall": "CH",
  "Delany Hall": "DY",
  "FitzGerald Gym": "FG",
  "Gertz Center": "GC",
  "Goldstein Theatre": "GT",
  "Honors Hall": "HH",
  "I Building": "IB",
  "King Hall": "KG",
  "Klapper Hall": "KP",
  "Music Building": "MU",
  "Queens Hall": "QH",
  "Rathaus Hall": "RA",
  "Rosenthal Library": "RO",
};

const buildingNameMap = {
  PH: "Powdermaker Hall",
  KY: "Kiely Hall",
  SB: "Science Building",
  RE: "Remsen Hall",
  AR: "Art Building",
  CD: "CD Building",
  CH: "Colwin Hall",
  DY: "Delany Hall",
  FG: "FitzGerald Gym",
  GC: "Gertz Center",
  GT: "Goldstein Theatre",
  HH: "Honors Hall",
  IB: "I Building",
  KG: "King Hall",
  KP: "Klapper Hall",
  MU: "Music Building",
  QH: "Queens Hall",
  RA: "Rathaus Hall",
  RO: "Rosenthal Library",
};

const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hour, minute] = timeString.split(":");
  let hourNum = parseInt(hour, 10);
  const suffix = hourNum >= 12 ? "PM" : "AM";
  if (hourNum === 0) hourNum = 12;
  if (hourNum > 12) hourNum -= 12;
  return `${hourNum}:${minute} ${suffix}`;
};

function FindRooms() {
  const navigate = useNavigate();
  const savedState = loadFindRoomsState();

  const [day, setDay] = useState(savedState?.day || "");
  const [startTime, setStartTime] = useState(savedState?.startTime || "");
  const [endTime, setEndTime] = useState(savedState?.endTime || "");
  const [building, setBuilding] = useState(savedState?.building || "All Buildings");
  const [rooms, setRooms] = useState(savedState?.rooms || []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    sessionStorage.setItem(
      "findRoomsState",
      JSON.stringify({
        day,
        startTime,
        endTime,
        building,
        rooms,
      })
    );
  }, [day, startTime, endTime, building, rooms]);


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
    setLoading(true);
    setSearched(true);

    const params = new URLSearchParams({
      day,
      starttime: startTime,
      endtime: endTime,
    });

    if (building !== "All Buildings") {
      const buildingCode = buildingMap[building];
      if (buildingCode) {
        params.append("building", buildingCode);
      }
    }

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    fetch(`${API_BASE_URL}/api/rooms/search?${params}`)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => {
        setError("Failed to fetch rooms. Please try again.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Box sx={styles.page}>
      <Box sx={styles.header}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={styles.title}>
          Find Available Rooms
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Select a day, time range, and building to discover available rooms.
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
                  <MenuItem value="Saturday">Saturday</MenuItem>
                  <MenuItem value="Sunday">Sunday</MenuItem>

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
                <MenuItem value="Art Building">Art Building</MenuItem>
                <MenuItem value="CD Building">CD Building</MenuItem>
                <MenuItem value="Colwin Hall">Colwin Hall</MenuItem>
                <MenuItem value="Delany Hall">Delany Hall</MenuItem>
                <MenuItem value="FitzGerald Gym">FitzGerald Gym</MenuItem>
                <MenuItem value="Gertz Center">Gertz Center</MenuItem>
                <MenuItem value="Goldstein Theatre">Goldstein Theatre</MenuItem>
                <MenuItem value="Honors Hall">Honors Hall</MenuItem>
                <MenuItem value="I Building">I Building</MenuItem>
                <MenuItem value="King Hall">King Hall</MenuItem>
                <MenuItem value="Klapper Hall">Klapper Hall</MenuItem>
                <MenuItem value="Kiely Hall">Kiely Hall</MenuItem>
                <MenuItem value="Music Building">Music Building</MenuItem>
                <MenuItem value="Powdermaker Hall">Powdermaker Hall</MenuItem>
                <MenuItem value="Queens Hall">Queens Hall</MenuItem>
                <MenuItem value="Rathaus Hall">Rathaus Hall</MenuItem>
                <MenuItem value="Remsen Hall">Remsen Hall</MenuItem>
                <MenuItem value="Rosenthal Library">Rosenthal Library</MenuItem>
                <MenuItem value="Science Building">Science Building</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" size="large" sx={styles.searchButton} disabled={loading}>
              {loading ? "Searching..." : "Search Rooms"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box sx={styles.resultsSection}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Available Rooms
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : rooms.length === 0 ? (
          <Typography color="text.secondary">
            {searched ? "No rooms available for the selected criteria." : "Enter a day and time range to find available rooms."}
          </Typography>
        ) : (
          <Box sx={styles.roomsGrid}>
            {rooms.map((room) => (
              <Card sx={styles.roomCard} key={room.id}>
                <CardContent sx={styles.roomCardContent}>
                  <Typography variant="h5" color="text.secondary">
                    {buildingNameMap[room.building] || room.building}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={styles.roomCode}>
                    {room.room_code}
                  </Typography>
                  <Typography variant="body1" sx={styles.availableText}>
                    Available from {formatTime(startTime)} to {formatTime(endTime)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{...styles.roomButton,
                      mt: "auto",
                    }}
                    onClick={() =>
                      navigate(`/rooms/${room.id}`, {
                        state: {
                          day,
                          room_code: room.room_code,
                          building: room.building,
                        },
                      })
                    }
                  >
                    View Room Schedule
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "15px",
    marginTop: "24px",
  },
  roomCard: {
    borderRadius: "30px",
    backgroundColor: "#e8f8ea",
    border: "1px solid #c7edd0",
    minHeight: "180px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "28px",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
  },
  roomCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  roomCode: {
    color: "#0f5132",
  },
  availableText: {
    color: "#166534",
    fontWeight: 600,
    fontSize: "1.05rem",
  },
  roomButton: {
    marginTop: "16px",
    textTransform: "none",
    px: 3,
    py: 1.25,
    backgroundColor: "#0f5132",
    color: "#fff",
    fontWeight: "600",
    '&:hover': {
      backgroundColor: "#0b3f2b",
    },
  },
};

export default FindRooms;
