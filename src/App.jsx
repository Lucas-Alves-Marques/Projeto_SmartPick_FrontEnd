import style from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Layout/NavBar/NavBar";
import Container from "./Layout/Container/Container";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Form/Register/Register";
import Listagem from "./Pages/Listagem/Listagem";
import Details from './Pages/Details/Details'
import Footer from "./Layout/Footer/Footer";
import Uptade from "./Pages/Form/Uptade/UptadeRaffle";
import Raffle from "./Pages/Raffle/Raffle";

function App() {

  return (

    <div className={style.body}>

      <BrowserRouter>

        <NavBar />

        <Container>

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/register" element={<Register />} />

            <Route path="/raffle/list" element={<Listagem />} />

            <Route path="/raffle/prizeDraw/:id_raffle" element={<Raffle />} />

            <Route path="/raffle/uptade/:id_raffle" element={<Uptade />} />

            <Route path="/raffle/info_card/:id_raffle" element={<Details />} />

          </Routes>

        </Container>

        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;
