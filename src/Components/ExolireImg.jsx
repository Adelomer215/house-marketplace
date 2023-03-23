import React from "react";
import { Link } from "react-router-dom";

const ExolireImg = ({ img, to, alt }) => {
  return (
    <Link to={`/category/${to}`}>
      <img src={img} alt={alt} className=" object-cover rounded-md h-[10rem]" />
      <p className="text-center">Places for {to}</p>
    </Link>
  );
};

export default ExolireImg;
