import { BrowserRouter, Route, Routes } from "react-router";

import Register from "../pages/Register";
import Login from "../pages/login";

import ProtectedRoute from "./ProtectedRoute";
import TodoContainer from "../components/TodoContainer";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TodoContainer />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
