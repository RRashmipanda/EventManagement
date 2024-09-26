import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "TAOA",
      location: "Australia",
      openEvents: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "USA",
      openEvents: 10,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "INDIA",
      openEvents: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP ORGANISATION</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                  <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Events {element.openEvents}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;