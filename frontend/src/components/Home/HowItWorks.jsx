import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How IT Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
              Add personality to your event page with event details, images, videos, and more.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Event/Create a Event</p>
              <p>
              Share the event via social media with one click and spread the word via email or in person.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Booking For Events</p>
              <p>
              Generate sales with early-bird discounts, coupons and group ticketing features, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;