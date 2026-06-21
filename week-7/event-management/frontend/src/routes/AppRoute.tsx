import { BrowserRouter, Route, Routes } from "react-router";

import Login from "../pages/login";
import Register from "../pages/Register";
import LandingPage from "../pages/Landing";
import ProtectedRoute from "./ProtectedRoute";
import CreateEventForm from "../components/EventForm";
import EventsView from "../components/EventsView";
import EventDetail from "../components/EventDetail";
import Dashboard from "../pages/Dashboard";
import DraftEventsView from "../components/DraftEventsView";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<LandingPage></LandingPage>} />

        <Route path="/events" element={<EventsView></EventsView>}></Route>
        <Route path="/events/:id" element={<EventDetail></EventDetail>}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="create"
            element={<CreateEventForm></CreateEventForm>}
          ></Route>
          <Route path="events" element={<EventsView></EventsView>}></Route>
          <Route
            path="events/:id"
            element={<EventDetail></EventDetail>}
          ></Route>
          <Route path="draft" element={<DraftEventsView />}></Route>
          <Route path="draft/:id" element={<EventDetail></EventDetail>}></Route>
        </Route>

        <Route path="*" element={<div>404 Not found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
