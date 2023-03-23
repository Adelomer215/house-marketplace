import React, { createContext, useReducer } from "react";
import SignUpReducer from "./SignUpReducer";

export const SignUpContext = createContext();

const SignUpContextProvider = ({ children }) => {
  const initState = {
    showPassword: false,
    name: "",
    email: "",
    password: "",
  };
  const [state, dispatch] = useReducer(SignUpReducer, initState);

  const { showPassword, email, password, name } = state;
  return (
    <SignUpContext.Provider
      value={{ showPassword, name, email, password, dispatch }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpContextProvider;
