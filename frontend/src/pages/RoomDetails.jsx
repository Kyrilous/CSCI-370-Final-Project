import { useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function RoomDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const state = location.state || {};
  const dayLabel = state.day || "Today";
  const roomLabel = state.room_code || `Room ${id}`;
  const buildingLabel = state.building || "Building";

  useEffect(() => {
    if (id && state.day) {
      fetch(`http://127.0.0.1:5000/api/rooms/${id}/schedule?day=${state.day}`)
        .then((response) => response.json())
        .then((data) => {
          setSchedule(data);
        })
        .catch((err) => {
          setError("Failed to load schedule.");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, state.day]);

  const room = useMemo(
    () => ({ id, room: roomLabel, building: buildingLabel }),
    [id, roomLabel, buildingLabel]
  );

  const formatScheduleTime = (timeString) => {
  if (!timeString) return "";

  const [hour, minute] = timeString.split(":");

  let hourNum = parseInt(hour, 10);
  const suffix = hourNum >= 12 ? "PM" : "AM";

  if (hourNum === 0) hourNum = 12;
  if (hourNum > 12) hourNum -= 12;

  return `${hourNum}:${minute} ${suffix}`;
};

  return (
    <Box sx={styles.page}>
      <Box sx={styles.container}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/find-rooms")}
          sx={{ mb: 3 }}
        >
          Back to Search
        </Button>

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {room.room} • Schedule
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {room.building} — {dayLabel}
        </Typography>

        <Card sx={styles.detailCard}>
          <CardContent>
            <Typography variant="h6" fontWeight="700" gutterBottom>
              Today’s Schedule
            </Typography>

            {loading ? (
              <Typography>Loading schedule...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : schedule.length === 0 ? (
              <Typography color="text.secondary">
                No schedule data available for this room today.
              </Typography>
            ) : (
              <List>
                {schedule.map((entry, index) => (
                  <Box key={index}>
                    <ListItem disableGutters>
                      <ListItemText
                        primary={`${formatScheduleTime(entry.start_time)} - ${formatScheduleTime(entry.end_time)}`}
                        secondary={`${entry.course_name} • ${entry.instructor}`}
                      />
                    </ListItem>
                    {index < schedule.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
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
    py: 4,
  },
  container: {
    width: "100%",
    maxWidth: 800,
    mx: "auto",
    px: 3,
  },
  detailCard: {
    borderRadius: 4,
    boxShadow: 4,
  },
};

export default RoomDetails;
