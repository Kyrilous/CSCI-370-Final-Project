import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import FindRooms from "./pages/FindRooms";
import AdminLogin from "./pages/AdminLogin";
import RoomDetails from "./pages/RoomDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-rooms" element={<FindRooms />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
      </Routes>
    </>
  );
}

export default App;