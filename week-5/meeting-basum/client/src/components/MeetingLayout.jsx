import { Outlet, NavLink, useParams } from "react-router-dom";

const MeetingLayout = () => {
  const { meetingId } = useParams();

  return (
    <div>
      <h2>Meeting ID: {meetingId}</h2>

      <nav style={{ display: "flex", gap: "10px" }}>
        <NavLink to="details">Details</NavLink>
        <NavLink to="participants">Participants</NavLink>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};

export default MeetingLayout;
