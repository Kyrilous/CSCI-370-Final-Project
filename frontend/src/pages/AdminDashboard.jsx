import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function AdminDashboard() {
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setCsvFile(file);
        setFileName(file.name);
        setMessage("");
      } else {
        setCsvFile(null);
        setFileName("");
        setMessage("Please select a valid CSV file");
        setMessageType("error");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedSeason) {
      setMessage("Please select a season");
      setMessageType("error");
      return;
    }

    if (!selectedYear) {
      setMessage("Please select a year");
      setMessageType("error");
      return;
    }

    if (!csvFile) {
      setMessage("Please select a CSV file");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const semesterName = `${selectedSeason} ${selectedYear}`;
      const formData = new FormData();
      formData.append("semesterName", semesterName);
      formData.append("csvFile", csvFile);

      const token = localStorage.getItem("adminToken");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/admin/semester`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setMessage("Semester data submitted successfully!");
        setMessageType("success");
        setSelectedSeason("");
        setSelectedYear("");
        setCsvFile(null);
        setFileName("");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to submit semester data");
        setMessageType("error");
      }
    } catch (error) {
      setMessage(
        "Error submitting data. Backend may not be ready yet. " +
          error.message
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={style.page}>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 4,
            boxShadow: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Admin Dashboard
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Upload semester information and course/room data
            </Typography>

            {message && (
              <Alert severity={messageType} sx={{ mb: 3 }}>
                {message}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              {/* Semester Selection */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <FormControl fullWidth disabled={loading}>
                  <InputLabel>Season</InputLabel>
                  <Select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    label="Season"
                  >
                    <MenuItem value="Spring">Spring</MenuItem>
                    <MenuItem value="Fall">Fall</MenuItem>
                    <MenuItem value="Summer">Summer</MenuItem>
                    <MenuItem value="Winter">Winter</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth disabled={loading}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    label="Year"
                  >
                    {Array.from({ length: 50 }, (_, i) => 2026 + i).map(
                      (year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Box>

              {/* CSV File Upload */}
              <Box>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 2 }}>
                  Upload Course/Room Information
                </Typography>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={loading}
                  style={{ display: "none" }}
                  id="csv-upload"
                />
                <label htmlFor="csv-upload" style={{ width: "100%" }}>
                  <Paper
                    component="div"
                    sx={{
                      p: 3,
                      textAlign: "center",
                      border: "2px dashed #cbd5e1",
                      borderRadius: 2,
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.2s",
                      backgroundColor: fileName ? "#eef2ff" : "transparent",
                      "&:hover": {
                        borderColor: !loading ? "#64748b" : "#cbd5e1",
                        backgroundColor: !loading ? "#f1f5f9" : "transparent",
                      },
                      opacity: loading ? 0.6 : 1,
                    }}
                  >
                    <CloudUploadIcon
                      sx={{ fontSize: 40, color: "#6366f1", mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {fileName ? fileName : "Click to select CSV file"}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ mt: 1, display: "block" }}
                    >
                      CSV file with columns: Course ID, Course Name, Room, Time,
                      etc.
                    </Typography>
                  </Paper>
                </label>
              </Box>

              {/* Submit Button */}
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: "#6366f1",
                  "&:hover": {
                    backgroundColor: "#4f46e5",
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                    Submitting...
                  </>
                ) : (
                  "Submit Semester Data"
                )}
              </Button>
            </Box>

            {/* Instructions */}
            <Box
              sx={{
                mt: 4,
                p: 2,
                backgroundColor: "#f8fafc",
                borderRadius: 2,
                borderLeft: "4px solid #6366f1",
              }}
            >
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1 }}>
                CSV Format Requirements:
              </Typography>
              <Typography variant="caption" color="text.secondary" component="div">
                • First row should contain column headers
              </Typography>
              <Typography variant="caption" color="text.secondary" component="div">
                • Required columns: Course ID, Course Name, Room
              </Typography>
              <Typography variant="caption" color="text.secondary" component="div">
                • Optional columns: Time, Instructor, Credits, etc.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

const style = {
  page: {
    background:
      "linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #fff7ed 100%)",
    color: "#1e293b",
  },
};

export default AdminDashboard;
