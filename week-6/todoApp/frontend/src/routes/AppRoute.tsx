import { BrowserRouter, Route, Routes } from "react-router";

import Register from "../pages/Register";
import Login from "../pages/login";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<App />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
