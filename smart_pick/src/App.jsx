import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Layout/NavBar/NavBar";
import Cadastro from "./Pages/Cadastro/Casdastro";
import Listagem from "./Pages/Listagem/Listagem";
import Home from "./Pages/Home/Home";
import Container from "./Layout/Container/Container";
import Footer from "./Layout/Footer/Footer";

function App() {
  return (
    <div className='body'>
      <BrowserRouter>

        <NavBar />

        <Container>

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/cadastro" element={<Cadastro />} />

            <Route path="/listagem" element={<Listagem />} />

          </Routes>

        </Container>
          
        <Footer/>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
