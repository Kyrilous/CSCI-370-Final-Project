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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      fetch(`${API_BASE_URL}/api/rooms/${id}/schedule?day=${state.day}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
          }
          return response.json();
        })
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
          sx={styles.backButton}
        >
          Back to Search
        </Button>

        <Card sx={styles.detailCard}>
          <CardContent sx={styles.detailCardContent}>
            <Box sx={styles.cardHeader}>
              <Typography variant="h4" fontWeight="bold" sx={styles.heading}>
                {room.room} • Schedule
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {room.building} — {dayLabel}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: "rgba(15, 23, 42, 0.12)" }} />

            <Typography variant="h6" fontWeight="700" gutterBottom>
              Today’s Schedule
            </Typography>

            {loading ? (
              <Typography>Loading schedule...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : schedule.length === 0 ? (
              <Typography color="text.secondary">
                No classes scheduled for this room today.
              </Typography>
            ) : (
              <List disablePadding>
                {schedule.map((entry, index) => (
                  <Box key={index} sx={styles.listItemWrapper}>
                    <ListItem disableGutters sx={styles.listItem}>
                      <ListItemText
                        primary={
                          <Typography sx={styles.timeText}>
                            {formatScheduleTime(entry.start_time)} - {formatScheduleTime(entry.end_time)}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={styles.courseText}>
                            {entry.course_name} • {entry.instructor}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < schedule.length - 1 && <Divider sx={{ borderColor: "rgba(15, 23, 42, 0.08)" }} />}
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
    py: { xs: 3, sm: 4 },
    px: { xs: 1.5, sm: 0 },
  },
  container: {
    width: "100%",
    maxWidth: 760,
    mx: "auto",
    px: { xs: 1.5, sm: 3 },
  },
  headerRow: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 3,
    alignItems: "flex-start",
    "@media (max-width: 600px)": {
      alignItems: "stretch",
    },
  },
  backButton: {
    width: { xs: "100%", sm: "auto" },
    justifyContent: "center",
    mb: { xs: 1.5, sm: 0 },
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
    mb: 2,
  },
  heading: {
    fontSize: { xs: "1.9rem", sm: "2.5rem" },
    lineHeight: 1.05,
  },
  detailCard: {
    borderRadius: 4,
    boxShadow: 4,
    backgroundColor: "rgba(255,255,255,0.94)",
    overflow: "hidden",
  },
  detailCardContent: {
    py: { xs: 2, sm: 3 },
    px: { xs: 2, sm: 3 },
  },
  listItemWrapper: {
    py: 1.5,
  },
  listItem: {
    px: 0,
  },
  timeText: {
    fontWeight: 700,
    fontSize: { xs: "1rem", sm: "1.05rem" },
  },
  courseText: {
    color: "#475569",
    fontSize: { xs: "0.95rem", sm: "1rem" },
  },
};

export default RoomDetails;