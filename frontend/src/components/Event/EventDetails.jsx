import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";



const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/event/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setEvent(res.data.event);
      
      })
      .catch((error) => {
        // navigateTo("/notfound");
        console.log(error.response?.data?.message || error.message);
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }
  
 

  return (
    <section className="eventDetails page">
      <div className="container">
        <h3>Event Details</h3>
        <div className="banner">
          <p>
            Title: <span> {event.title}</span>
          </p>
          <p>
            Category: <span>{event.category}</span>
          </p>
          <p>
            Location: <span>{event.location}</span>
          </p>
          <p>
            Description: <span>{event.description}</span>
          </p>
          <p>
            Event Posted On: <span>{event.eventPostedOn}</span>
          </p>
          <p>
          Ticket Price: <span>{event.ticketprice}</span>
          </p>
          {user && user.role === "organiser" ? (
            <></>
          ) : (
            <Link to={`/booking/${event._id}`}>Booking Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;