import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { SignInContext } from "../context/signIn/SignInContext";
import { SHOW_PASSWORD, UPDATE_EMAIL_PASSWORD } from "../context/Actions";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "../Components/OAuth";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import inputBg from "../assets/svg/personIcon.svg";
import passwordBg from "../assets/svg/lockIcon.svg";

const SignIn = () => {
  const { email, password, showPassword, dispatch } = useContext(SignInContext);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const id = e.target.id;
    const value =
      id === "email" ? emailRef.current.value : passwordRef.current.value;
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

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) navigate("/");
    } catch (error) {
      toast.error("Wrong name or password");
    }
  };

  return (
    <section>
      <div className="container mx-auto">
        <header className="my-4 text-center">
          <p className=" text-4xl font-bold">Welcome Back!</p>
        </header>

        {/* form with email and password inputs  */}
        <form onSubmit={onSubmit}>
          {/* email input */}
          <EmailInput
            type="email"
            className="py-2 pl-12 mb-4"
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
              ShowPassword={showPassword}
              src={visibilityIcon}
              alt="show password"
              onClick={() => dispatch({ type: SHOW_PASSWORD })}
            />
          </div>

          {/* forgot password link */}
          <Link
            to="/forgot-password"
            className="text-right block text-green-500 font-bold mr-4 mb-8 capitalize"
          >
            forgot password
          </Link>

          {/* sign in area */}
          <SignInBat className="flex items-center gap-4">
            <p className=" font-bold text-2xl capitalize">sign in</p>
            <button className="flex justify-center items-center rounded-full">
              <ArrowRightIcon />
            </button>
          </SignInBat>
        </form>

        <OAuth />

        <Link
          to="/sign-up"
          className="text-center block text-green-500 font-bold mr-4 mb-8 capitalize"
        >
          sign up instead
        </Link>
      </div>
    </section>
  );
};

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
    props.ShowPassword
      ? "invert(52%) sepia(94%) saturate(1162%) hue-rotate(78deg) brightness(110%) contrast(133%)"
      : "invert(33%) sepia(93%) saturate(7346%) hue-rotate(355deg) brightness(94%) contrast(120%)"};
`;

const SignInBat = styled.div`
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
export default SignIn;
