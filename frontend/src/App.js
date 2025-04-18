import './css/loginPage.css';
import {HashRouter as Router, Routes, Route } from "react-router";
import MainApp_loginPage from './MainApp_loginPage';
import MemoryGame from './pages/MemoryGame';
import Clicker from './pages/Clicker';
import GamesPage from './pages/GamesPage';
import RockPaperScissors from './pages/RockPaperScissors';
import SlotMachine from './pages/SlotMachine';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp_loginPage />} />
        <Route path="/memoryGame" element={<MemoryGame />} />
        <Route path="/clicker" element={<Clicker />} />
        <Route path="/gamesPage" element={<GamesPage />} />
        <Route path="/rockpaperscissors" element={<RockPaperScissors />} />
        <Route path="/slotmachine" element={<SlotMachine />} />
      </Routes>
    </Router>
  );
}

export default App;
