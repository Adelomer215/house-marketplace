import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { dataBase } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeData, setchangeData] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (e) => {
    setUser(
      (prev) =>
        (prev = {
          ...prev,
          [e.target.id]: e.target.value,
        })
    );
  };

  const onSubmit = async () => {
    try {
      // Update display name in fb
      await updateProfile(auth.currentUser, {
        displayName: user.name,
      });

      // Update in firestore
      const userRefUpdated = doc(dataBase, "users", auth.currentUser.uid);
      await updateDoc(userRefUpdated, {
        name: user.name,
      });
    } catch (error) {
      toast.error("can't update user profile");
    }
  };
  return (
    <div className="container mx-auto">
      <header className=" flex justify-center items-center gap-8 mt-5 mb-2">
        <h5>my profile</h5>
        <button
          onClick={logout}
          className="bg-green-500 text-white px-4 rounded-md"
        >
          Logout
        </button>
      </header>
      <main>
        <Prsonal className="flex justify-between mb-4">
          <p className=" capitalize">prsonal detalis</p>
          <p
            className=" cursor-pointer min-w-[5rem] font-bold text-green-500"
            onClick={() => {
              setchangeData(!changeData);
              changeData && onSubmit();
            }}
          >
            {!changeData ? "Change" : "Done"}
          </p>
        </Prsonal>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={onChange}
            disabled={!changeData}
            className=" bg-white w-full font-bold pl-4 h-8 rounded-[0.5rem] mb-4"
          />
          <input
            type="text"
            id="email"
            value={user.email}
            onChange={onChange}
            disabled={!changeData}
            className=" bg-white w-full font-bold pl-4 h-8 rounded-[0.5rem]"
          />
        </form>
        <Link
          to="/create-lisiting"
          className="flex justify-between bg-white rounded-[1rem] my-4 p-4"
        >
          <img src={homeIcon} alt="home icon" />
          <p className=" text-2xl font-bold ">sell or rent your home</p>
          <img src={arrowRight} alt="arrowRight" />
        </Link>
      </main>
    </div>
  );
};

const Prsonal = styled.div`
  display: flex;

  @media (min-width: 768px) {
    justify-content: center;
    gap: 3rem;
  }
`;

export default Profile;
