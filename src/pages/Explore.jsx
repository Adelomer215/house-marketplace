import React from "react";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import ExolireImg from "../Components/ExolireImg";

const Explore = () => {
  return (
    <div className="container mx-auto">
      <header>
        <p className="text-2xl text-center my-3 font-bold">Explore</p>
      </header>
      <main>
        {/* <Slider /> */}

        <p className="exploreCategoryHeading">Categories</p>
        <div className="flex justify-center items-center gap-4 my-4 flex-col sm:flex-row">
          <ExolireImg img={rentCategoryImage} to="rent" alt="rent" />
          <ExolireImg img={sellCategoryImage} to="sell" alt="rsellent" />
        </div>
      </main>
    </div>
  );
};

export default Explore;
