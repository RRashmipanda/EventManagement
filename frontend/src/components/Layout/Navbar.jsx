import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {

  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };
  
  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
    <div className="container">
      <div className="logo">
        <img src="/Event.png" alt="logo" />
      </div>
      <ul className={!show ? "menu" : "show-menu menu"}>
        <li>
          <Link to={"/"} onClick={() => setShow(false)}>
            HOME
          </Link>
        </li>
        <li>
          <Link to={"/event/getall"} onClick={() => setShow(false)}>
            ALL EVENTS
          </Link>
        </li>
        <li>
          <Link to={"/bookings/me"} onClick={() => setShow(false)}>
            {user && user.role === "organiser"
              ? "USER'S BOOKINGS": "MY BOOKINGS"}
          </Link>
        </li>
        {user && user.role === "newuser" ? (
          <>
            <li>
              <Link to={"/event/create"} onClick={() => setShow(false)}>
                CREATE EVENTS
              </Link>
            </li>          
          </>
        ) : (
          <>
           <li>
              <Link to={"/event/me"} onClick={() => setShow(false)}>
                MANAGE EVENTS
              </Link>
            </li>
          </>
        )}

        <button onClick={handleLogout}>LOGOUT</button>
      </ul>
      <div className="hamburger">
        <GiHamburgerMenu onClick={() => setShow(!show)} />
      </div>
    </div>
  </nav>
);
  
}

export default Navbar
