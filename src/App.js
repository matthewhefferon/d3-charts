import "./App.css";
import Bar from "./componets/Bar";
import Line from "./componets/Line";
import Pie from "./componets/Pie";

function App() {
  return (
    <div className="App">
      <div>
        <Bar />
      </div>
      <div>
        <Line />
      </div>
      <div>
        <Pie />
      </div>
    </div>
  );
}

export default App;
