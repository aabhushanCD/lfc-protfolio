import ".././styles/card.css";
import Button from "./ui/Button";
const Card = ({ stat }) => {
  const Icon = stat.icon;
  const { title, note, btmName, variant } = stat;
  return (
    <article className="card-box">
      <Icon width={24} />
      <h3>{title}</h3>
      <p>{note}</p>
      <Button variant={variant}>{btmName} </Button>
    </article>
  );
};

export default Card;
