import "./App.css";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode, toggle } = useTheme();
  return (
    <div className={mode} style={{ minHeight: "100vh" }}>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

export default App;
