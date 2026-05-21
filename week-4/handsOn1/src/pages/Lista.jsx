import { useListOfPlayer } from "../store/Zustand";

const Lista = () => {
  const { getPlayer } = useListOfPlayer();
  return (
    <div>
      <h1>
        {getPlayer().map((a, index) => (
          <div key={index}>{a}</div>
        ))}
      </h1>
    </div>
  );
};

export default Lista;
