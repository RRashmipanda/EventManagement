
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/event/getall", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setEvents(res.data.events);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/event/search`, {
        params: {
          keyword: searchTerm,
        },
        withCredentials: true,
      });
      setEvents(res.data.events);
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };
  
  
  

  
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);
  return (
    
   <>
  <div className="search-container">
    <form className="search-form" onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder="Search Events" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fa fa-search"></i> Search
      </button>
    </form>
  </div>

  
<section className="events page">
<div className="container">
        <div className="banner">
          {events &&
            events.map((element) => {
              return (
                <div className="card" key={element._id}>
                  {/* Display event image if available */}
                  {element.eventImage && (
                    <img
                      src={element.eventImage}
                      // alt={element.title}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/events/${element._id}`}>Event Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
    </>
  );
};

export default Events;


