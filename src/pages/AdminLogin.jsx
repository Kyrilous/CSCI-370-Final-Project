import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

function AdminLogin() {
  return (
    <div style={style.page}>
        <Box
        sx={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
        }}
        >
        <Card
            sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            boxShadow: 4,
            }}
        >
            <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Admin Login
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Sign in to access RoomRadar QC features.
            </Typography>

            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Email" type="email" fullWidth />
                <TextField label="Password" type="password" fullWidth />

                <Button variant="contained" size="large" sx={{ mt: 1 }}>
                Login
                </Button>
            </Box>
            </CardContent>
        </Card>
        </Box>
    </div>
  );
}


const style = {
  page: {
      minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #fff7ed 100%)",
    color: "#1e293b",
    },
}
export default AdminLogin; 

