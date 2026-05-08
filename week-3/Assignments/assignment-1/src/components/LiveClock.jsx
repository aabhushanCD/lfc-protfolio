import { useEffect, useState } from "react";

const LiveClock = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };    
  }, []);

  const formattedTime = date.toLocaleTimeString("en-GB");

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial",
        fontSize: "75px",
      }}
    >
      <h1>Live Clock</h1>
      {formattedTime}
    </div>
  );
};

export default LiveClock;
