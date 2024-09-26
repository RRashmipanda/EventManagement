import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const { id } = useParams();

  const handleBooking = async (e) => {
    e.preventDefault();
    const payload = { name, email, phone, address, eventID: id };
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/booking/book-event",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      
      );
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      toast.success(data.message);
      navigateTo("/event/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "organiser")) {
    navigateTo("/");
  }

  return (
    <section className="booking">
      <div className="container">
        <h3>Booking Form</h3>
        <form onSubmit={handleBooking}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          
          <button type="submit">Send Booking</button>
        </form>
      </div>
    </section>
  );
};

export default Booking;


