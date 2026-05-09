import { useMemo } from "react";
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

const rooms = [
  { id: "1", room: "PH 116", building: "Powdermaker Hall" },
  { id: "2", room: "KY 243", building: "Kiely Hall" },
  { id: "3", room: "SB B145", building: "Science Building" },
];

const schedules = {
  "1": [
    { time: "8:00 AM - 9:15 AM", course: "Intro to Programming", instructor: "Prof. Lee" },
    { time: "10:00 AM - 11:15 AM", course: "Algorithms", instructor: "Dr. Patel" },
    { time: "1:30 PM - 2:45 PM", course: "Web Design", instructor: "Dr. Simmons" },
    { time: "3:00 PM - 4:15 PM", course: "Database Systems", instructor: "Dr. Chen" },
  ],
  "2": [
    { time: "9:00 AM - 10:15 AM", course: "Operating Systems", instructor: "Dr. Cooper" },
    { time: "11:00 AM - 12:15 PM", course: "Cybersecurity", instructor: "Prof. Perez" },
    { time: "2:00 PM - 3:15 PM", course: "Networking", instructor: "Dr. Murphy" },
  ],
  "3": [
    { time: "8:30 AM - 9:45 AM", course: "Chemistry Lab", instructor: "Dr. Fields" },
    { time: "10:30 AM - 11:45 AM", course: "Physics Lab", instructor: "Dr. Simone" },
    { time: "1:00 PM - 2:15 PM", course: "Biology Seminar", instructor: "Prof. Nguyen" },
  ],
};

function RoomDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const room = useMemo(
    () => rooms.find((item) => item.id === id) || rooms[0],
    [id]
  );

  const schedule = useMemo(() => schedules[id] || [], [id]);
  const dayLabel = location.state?.day || "Today";

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

            {schedule.length === 0 ? (
              <Typography color="text.secondary">
                No schedule data available for this room today.
              </Typography>
            ) : (
              <List>
                {schedule.map((entry, index) => (
                  <Box key={entry.time}>
                    <ListItem disableGutters>
                      <ListItemText
                        primary={entry.time}
                        secondary={`${entry.course} • ${entry.instructor}`}
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
