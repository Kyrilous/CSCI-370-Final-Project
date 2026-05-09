import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import Home from "./pages/Home";
import FindRooms from "./pages/FindRooms";
<<<<<<< Updated upstream
import Login from "./pages/Login";
import AdminUpload from "./pages/AdminUpload";
=======
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
>>>>>>> Stashed changes
import RoomDetails from "./pages/RoomDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/find-rooms" element={<FindRooms />} />
<<<<<<< Updated upstream
        <Route path="/login" element={<Login />} />
        <Route path="/admin-upload" element={<AdminUpload />} />
=======

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

>>>>>>> Stashed changes
        <Route path="/rooms/:id" element={<RoomDetails />} />
      </Routes>
    </>
  );
}

export default App;