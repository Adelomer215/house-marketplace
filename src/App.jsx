import { Routes, Route } from "react-router-dom";
import { NavBar, PrivateRoute } from "./Components";
import {
  Category,
  Explore,
  ForgotPassword,
  Offers,
  Profile,
  SignIn,
  SignUp,
  CreateLisiting,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-lisiting" element={<CreateLisiting />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <NavBar />
      <ToastContainer />
    </>
  );
}

export default App;
