import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

import inputBg from "../assets/svg/personIcon.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

const ForgotPassword = () => {
  const emailRef = useRef("");
  const onChange = () => {};
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, emailRef.current.value);
      console.log(emailRef.current.value);
      toast.success("Email was sent successfully");
    } catch (error) {
      toast.error("Couldn't send password reset email");
    }
  };

  return (
    <section className="container mx-auto">
      <header className="my-4 text-center">
        <p className=" text-4xl font-bold">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <EmailInput
            type="email"
            className="py-2 pl-12 mb-4"
            placeholder="email"
            id="email"
            ref={emailRef}
            onChange={onChange}
          />
          <Link
            to="/sign-in"
            className=" block text-right capitalize text-xl text-green-500"
          >
            sign in
          </Link>

          <SignInBar className="signInBar flex items-center mt-4">
            <p className="text-4xl capitalize font-bold">send reset link</p>
            <button
              type="submit"
              className="flex justify-center items-center rounded-full"
            >
              <ArrowRightIcon />
            </button>
          </SignInBar>
        </form>
      </main>
    </section>
  );
};
const EmailInput = styled.input`
  width: 100%;
  border-radius: 2rem;
  background: url(${inputBg}) #ffffff 2.5% center no-repeat;
`;
const SignInBar = styled.div`
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
export default ForgotPassword;
