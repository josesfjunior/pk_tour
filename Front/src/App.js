import Home from "./components/home";
import {Routes, Route} from "react-router-dom";
import Torneios from "./components/torneios";
import Edicoes from "./components/edicoes";
import Etapas from "./components/etapas";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ranking" element={<Torneios />} />
              <Route path="/edicoes"  element={<Edicoes />} />
              <Route path="/etapas/:id" element={<Etapas />} />
          </Routes>
      </header>
    </div>
  );
}

export default App;
