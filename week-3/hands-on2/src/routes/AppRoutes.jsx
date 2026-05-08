import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout";
import About from "../pages/About";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} /> 
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
