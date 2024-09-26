import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Events from "./components/Event/Events"
import EventDetails from "./components/Event/EventDetails";
import CreateEvent from "./components/Event/CreateEvent";
import Booking from "./components/Booking/Booking";
import MyBooking from "./components/Booking/MyBooking";
import NotFound from "./components/Notfound/Notfound";
import ManageEvents from "./components/Event/ManageEvents";


const App = () => {
  
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser",{withCredentials: true});
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);


  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/event/getall" element={<Events />} />
          
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/bookings/me" element={<MyBooking />} />
          <Route path="/event/create" element={<CreateEvent />} />
          <Route path="/event/me" element={<ManageEvents />} />
          {/* <Route path="/google-login" element={< />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  )
}

export default App
