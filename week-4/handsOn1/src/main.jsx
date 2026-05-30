import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./provider/ThemeContextProvider.jsx";
// import Lista from "./pages/Lista.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignupForm from "./components/Form.jsx";
import SignInForm from "./components/SignInForm.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInForm />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
