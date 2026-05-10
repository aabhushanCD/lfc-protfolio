import { useSearchParams } from "react-router-dom";

const Calender = () => {
  const { view } = useSearchParams();
  return (
    <div>
      Calender
      <h2>Meeting is schedule in {view}</h2>
    </div>
  );
};

export default Calender;
