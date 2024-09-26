import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const MyBooking = () => {
  const { user } = useContext(Context);
  const [bookings, setBookings] = useState([]);

 

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "organiser") {
        axios
          .get("http://localhost:4000/api/v1/booking/organiser/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setBookings(res.data.bookings);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/booking/newuser/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setBookings(res.data.bookings);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteBooking = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/booking/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setBookings((prevbooking) =>
            prevbooking.filter((booking) => booking._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="my_bookings page">
      {user && user.role === "newuser" ? (
        <div className="container">
          <h1>My bookings</h1>
          {bookings.length <= 0 ? (
            <>
              {" "}
              <h4>No bookings Found</h4>{" "}
            </>
          ) : (
            bookings.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteBooking={deleteBooking}
                  
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Bookings From Users</h1>
          {bookings.length <= 0 ? (
            <>
              <h4>No bookings Found</h4>
            </>
          ) : (
            bookings.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  
                />
              );
            })
          )}
        </div>
      )}
      
    </section>
  );
};

export default MyBooking;

const JobSeekerCard = ({ element, deleteBooking }) => {
  return (
    <>
      <div className="newuser_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          
        </div>
        
        <div className="btn_area">
          <button onClick={() => deleteBooking(element._id)}>
            Delete booking
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element}) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          
        </div>
        
      </div>
    </>
  );
};