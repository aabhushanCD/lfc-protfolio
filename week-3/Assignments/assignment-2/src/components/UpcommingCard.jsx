import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
const UpcommingCard = ({ stats, index }) => {
  const { title, host, date } = stats;
  const navigate = useNavigate();

  return (
    <div className="upcomming-section">
      <div className="title">
        <img src="" alt="" />
        <div>
          <h4>{title}</h4>
          <p>Host: {host}</p>
        </div>
      </div>
      <div className="actions">
        <p>{date}</p>
        <Button variant="purple" onClick={() => navigate(`/meetings/${index}`)}>
          Join
        </Button>
      </div>
    </div>
  );
};

export default UpcommingCard;
