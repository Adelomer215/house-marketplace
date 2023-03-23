import React from "react";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";
import { Link } from "react-router-dom";

const ListingItem = ({ listing, id }) => {
  return (
    <li>
      <Link
        className="flex justify-center gap-4 "
        to={`/cat/${listing.type}/${id}`}
      >
        <img
          className="rounded-[1rem] w-[10rem] object-cover"
          src={listing.imageUrls[0]}
          alt={listing.name}
        />
        <div>
          <p>{listing.location}</p>
          <p className=" font-bold text-2xl">{listing.name}</p>
          <p className=" text-green-500 text-2xl text-center">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className="flex justify-evenly">
            <img src={bedIcon} alt="bed" />
            <p>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} bedrooms`
                : "1 bedroom"}
            </p>
            <img src={bathtubIcon} alt="bathtub" />
            <p>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : "1 bathroom"}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListingItem;
