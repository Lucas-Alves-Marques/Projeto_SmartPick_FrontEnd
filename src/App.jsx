import style from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Layout/NavBar/NavBar";
import Container from "./Layout/Container/Container";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Listagem from "./Pages/Listagem/Listagem";
import InfoCard from './Pages/Listagem/Cards/Card_Info/Card_Info'
import Footer from "./Layout/Footer/Footer";


function App() {
  return (
    <div className={style.body}>
      <BrowserRouter>

        <NavBar />

        <Container>

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/cadastro" element={<Register />} />

            <Route path="/listagem" element={<Listagem />} />

            <Route path="/info_card/:id_raffle" element={<InfoCard />} />

          </Routes>

        </Container>
          
        <Footer/>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
