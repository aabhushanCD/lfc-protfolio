import "./App.css";
import MyComponent from "./components/MyComponent";

function App() {
  const name = "Aabhushan";
  return (
    <div>
      <MyComponent name={name} />
    </div>
  );
}

export default App;
