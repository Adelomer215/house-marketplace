import React, { createContext, useReducer } from "react";
import SignInReducers from "./SignInReducers";

export const SignInContext = createContext();

const SignInContextProvider = ({ children }) => {
  const initState = {
    showPassword: false,
    email: "",
    password: "",
  };
  const [state, dispatch] = useReducer(SignInReducers, initState);

  const { showPassword, email, password } = state;
  return (
    <SignInContext.Provider value={{ showPassword, email, password, dispatch }}>
      {children}
    </SignInContext.Provider>
  );
};
export default SignInContextProvider;
