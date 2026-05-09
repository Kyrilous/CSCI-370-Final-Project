<<<<<<< Updated upstream
function FindRooms() {
  return <h1>Find Available Rooms</h1>;
=======
import { useState, useEffect } from "react";
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

        <Button variant="contained" sx={styles.searchButton}>
          Find Rooms Available Now
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
>>>>>>> Stashed changes
}

export default FindRooms;