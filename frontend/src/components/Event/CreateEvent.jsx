import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";





const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [ticketprice, setTicketprice] = useState("")

  const { isAuthorized, user } = useContext(Context);

  const handleEventCreate = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/v1/event/create",
        { title ,description ,category ,location,ticketprice },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "newuser")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="event_post page">
        <div className="container">
          <h3>CREATE NEW EVENTS</h3>
          <form onSubmit={handleEventCreate}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Arts">Arts</option>
                <option value="Music and Theater">
                Music and Theater
                </option>
                <option value="Community and Culture">
                Community and Culture
                </option>
                <option value="Sports and Fitness">
                Sports and Fitness
                </option>
                <option value="Education and Training">Education and Training</option>
                <option value="Business">
                Business
                </option>
                <option value="Fashion">Fashion </option>
               
                <option value="Beauty">Beauty</option>
              </select>
            </div>
          
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
           
           <input
              type="text"
              value={ticketprice}
              onChange={(e) => setTicketprice(e.target.value)}
              placeholder="Ticket Price"
            />
           
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" Description"
            />
            <button type="submit">Create Event</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;



