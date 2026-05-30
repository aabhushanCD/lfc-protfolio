import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import App from "../App";
import JoinMetting from "../pages/JoinMetting";
import NewMetting from "../pages/NewMetting";
import Settings from "../pages/Settings";
import Schedule from "../pages/Schedule";
import Calender from "../pages/Calender";
import MeetingDetails from "../components/MeetingDetails";
import Participants from "../components/ParticipantPage";
import MeetingLayout from "../components/MeetingLayout";
import InvalidPage from "../pages/InvalidPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<App />} />

          {/* pages */}
          <Route path="join-meeting" element={<JoinMetting />} />
          <Route path="new-meeting" element={<NewMetting />} />
          <Route path="profile-settings" element={<Settings />} />
          <Route path="schedule-meeting" element={<Schedule />} />
          <Route path="calendar" element={<Calender />} />

          <Route path="/meetings/:meetingId" element={<MeetingLayout />}>
            <Route index element={<MeetingDetails />} />
            <Route path="details" element={<MeetingDetails />} />
            <Route path="participants" element={<Participants />} />
          </Route>
          <Route path="*" element={<InvalidPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
