import React, { useEffect, useState } from "react";
import { dataBase } from "../firebase.config";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { ListingItem } from "../Components";

const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const param = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const reference = collection(dataBase, "listings");

        // Create a query
        const queryRef = query(
          reference,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // snapchot
        const snapchot = await getDocs(queryRef);
        const listings = [];
        snapchot.forEach((snap) =>
          listings.push({
            id: snap.id,
            data: snap.data(),
          })
        );
        setListings(listings);
      } catch (error) {
        toast.error("Couldn't fetch listings");
      }
    };

    fetchListings();
  }, []);
  return (
    <div>
      <header className=" text-center my-4">
        <p className="text-2xl font-bold">Offers</p>
      </header>
      <main>
        {loading ? (
          <h3>Loading........</h3>
        ) : listings && listings.length > 0 ? (
          <ul className="categoryListings">
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
              />
            ))}
          </ul>
        ) : (
          <h3>No Offers</h3>
        )}
      </main>
    </div>
  );
};

export default Offers;
