import { useEffect } from "react";

import "./App.css";
import LiveClock from "./components/LiveClock";

function App() {
  useEffect(() => {
    setInterval(() => {});
  });
  return (
    <div>
      <LiveClock />
    </div>
  );
}

export default App;
