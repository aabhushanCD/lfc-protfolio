import ".././styles/card.css";
import { useSession } from "../context/SessionContext";
import Button from "./ui/Button";
const Card = ({ stat }) => {
  const { theme } = useSession();
  const Icon = stat.icon;
  const { title, note, btmName, variant } = stat;
  return (
    <article className={`card-box ${theme}`}>
      <Icon width={24} />
      <h3>{title}</h3>
      <p>{note}</p>
      <Button variant={variant}>{btmName} </Button>
    </article>
  );
};

export default Card;
