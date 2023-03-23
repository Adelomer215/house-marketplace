import React, { useContext, useRef } from "react";
import styled from "styled-components";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { dataBase } from "../firebase.config";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { SHOW_PASSWORD, UPDATE_EMAIL_PASSWORD } from "../context/Actions";
import { SignUpContext } from "../context/signUp/SignUpContext";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import nameBg from "../assets/svg/badgeIcon.svg";
import inputBg from "../assets/svg/personIcon.svg";
import passwordBg from "../assets/svg/lockIcon.svg";
import OAuth from "../Components/OAuth";

const SignUp = () => {
  const { showPassword, name, email, password, dispatch } =
    useContext(SignUpContext);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const id = e.target.id;
    const value =
      id === "email"
        ? emailRef.current.value
        : id === "name"
        ? nameRef.current.value
        : passwordRef.current.value;

    dispatch({
      type: UPDATE_EMAIL_PASSWORD,
      payload: {
        id,
        value,
      },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Sign up new users
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { name, email, password };
      formDataCopy.timestamp = serverTimestamp();
      // Add a new document in collection "cities"
      await setDoc(doc(dataBase, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("invalid data, something went wrong wuth registration");
    }
  };

  return (
    <section>
      <div className="container mx-auto">
        <header className="my-4 text-center">
          <p className=" text-4xl font-bold">Welcome 🙂!</p>
        </header>

        {/* form with email and password inputs  */}
        <form onSubmit={onSubmit}>
          {/* email input */}
          <NameInput
            type="text"
            className=" py-2 pl-12 mb-4"
            placeholder="name"
            id="name"
            ref={nameRef}
            onChange={onChange}
          />
          <EmailInput
            type="email"
            className=" py-2 pl-12 mb-4"
            placeholder="email"
            id="email"
            ref={emailRef}
            onChange={onChange}
          />

          {/* password input */}
          <div className="password relative">
            <PasswordInput
              className="py-2 pl-12 mb-4 "
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="password"
              ref={passwordRef}
              onChange={onChange}
            />

            <ShowPasswordImg
              className=" cursor-pointer w-[1.5rem] absolute"
              showPassword={showPassword}
              src={visibilityIcon}
              alt="show password"
              onClick={() => dispatch({ type: SHOW_PASSWORD })}
            />
          </div>

          {/* sign in area */}
          <SignUpBat className="flex items-center gap-4">
            <p className=" font-bold text-2xl capitalize">sign up</p>
            <button className="flex justify-center items-center rounded-full">
              <ArrowRightIcon />
            </button>
          </SignUpBat>
        </form>

        <OAuth />

        <Link
          to="/sign-in"
          className="text-center block text-green-500 font-bold mr-4 mb-8 capitalize"
        >
          sign in instead
        </Link>
      </div>
    </section>
  );
};

const NameInput = styled.input`
  width: 100%;
  border-radius: 2rem;
  background: url(${nameBg}) #ffffff 2.5% center no-repeat;
`;

const EmailInput = styled.input`
  width: 100%;
  border-radius: 2rem;
  background: url(${inputBg}) #ffffff 2.5% center no-repeat;
`;
const PasswordInput = styled.input`
  width: 100%;
  border-radius: 2rem;
  background: url(${passwordBg}) #ffffff 2.5% center no-repeat;
`;
const ShowPasswordImg = styled.img`
  top: 8px;
  right: 1rem;
  transition: all 0.2s ease-in;
  filter: ${(props) =>
    props.showPassword
      ? "invert(52%) sepia(94%) saturate(1162%) hue-rotate(78deg) brightness(110%) contrast(133%)"
      : "invert(33%) sepia(93%) saturate(7346%) hue-rotate(355deg) brightness(94%) contrast(120%)"};
`;

const SignUpBat = styled.div`
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  button {
    background-color: green;
    width: 2rem;
    height: 2rem;
    svg {
      fill: #fff;
      width: 2rem;
      height: 2rem;
    }
  }
`;
export default SignUp;
