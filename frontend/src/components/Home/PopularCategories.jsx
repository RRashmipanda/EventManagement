import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Arts",
      subTitle: "305 Open Events",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Theater And Music",
      subTitle: "500 Open Events",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Community and Culture ",
      subTitle: "200 Open Events",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "Sports and Fitness",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Education and Training",
      subTitle: "150 Open Events",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Business",
      subTitle: "867 Open Events",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Family and Friends",
      subTitle: "50 Open Events",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Coaching and Consulting",
      subTitle: "80 Open Events",
      icon: <IoGameController />,
    },
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;