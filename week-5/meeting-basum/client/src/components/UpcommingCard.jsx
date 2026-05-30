import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { useSession } from "../context/SessionContext";
import "../index.css";
const UpcommingCard = ({ stats }) => {
  const navigate = useNavigate();
  const { theme } = useSession();
  return (
    <div className={`upcomming-section ${theme}`}>
      <div className="title">
        <img src="" alt="" />
        <div>
          <h4>{stats.title}</h4>
          <p>Host: {stats.host}</p>
        </div>
      </div>
      <div className="actions">
        <p>{stats.date}</p>
        <Button
          variant="purple"
          onClick={() => navigate(`/meetings/${stats.id}`)}
        >
          Join
        </Button>
      </div>
    </div>
  );
};

export default UpcommingCard;
