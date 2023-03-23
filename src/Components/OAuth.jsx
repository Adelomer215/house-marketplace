import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { dataBase } from "../firebase.config";
import { toast } from "react-toastify";

import googleIcom from "../assets/svg/googleIcon.svg";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const googleAuth = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(dataBase, "users", user.uid);
      const docSnap = await getDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp(),
      });

      if (!docSnap) {
        await setDoc(docRef);
      }

      navigate("/");
    } catch (error) {
      toast.error("invalid data, something went wrong wuth Goole Auth");
    }
  };
  return (
    <div className=" flex items-center justify-center flex-col gap-2 my-8">
      <p>Sign {location.pathname === "/sign-in" ? "in" : "up"} with</p>
      <button
        onClick={googleAuth}
        className="w-[3rem] h-[3rem] bg-white rounded-full text-center flex items-center justify-center"
      >
        <img className="w-[2rem]" src={googleIcom} alt="goole icon" />
      </button>
    </div>
  );
};

export default OAuth;
