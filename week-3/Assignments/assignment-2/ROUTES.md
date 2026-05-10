| Route               | Component             | Description       | Hooks Used                   |
| ------------------- | --------------------- | ----------------- | ---------------------------- |
| `/`                 | Dashboard (`App.jsx`) | Home page         | `useNavigate`, `useLocation` |
| `/join-meeting`     | JoinMeeting           | Join meeting form | `useNavigate`                |
| `/new-meeting`      | NewMeeting            | Create meeting    | `useNavigate`                |
| `/calendar`         | Calendar              | Calendar view     | `useNavigate`                |
| `/schedule-meeting` | Schedule              | Schedule meeting  | `useNavigate`                |
| `/profile-settings` | Settings              | Profile settings  | `useNavigate`                |


Meeting Child Routes

| Route                               | Component      | Description          | Hooks Used  |
| ----------------------------------- | -------------- | -------------------- | ----------- |
| `/meetings/:meetingId`              | MeetingDetails | Default meeting page | `useParams` |
| `/meetings/:meetingId/details`      | MeetingDetails | Details tab          | `useParams` |
| `/meetings/:meetingId/participants` | Participants   | Participants list    | `useParams` |



❌ 404 Route
| Route | Component   | Hooks         |
| ----- | ----------- | ------------- |
| `*`   | InvalidPage | `useNavigate` |


Hooks Summary
useNavigate() → navigation buttons, redirects
useParams() → get meetingId
useLocation() → optional UI awareness
<Outlet /> → nested routes rendering