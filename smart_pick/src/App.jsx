import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Layout/NavBar";
import Cadastro from "./Pages/Casdastro";
import Listagem from "./Pages/Listagem";
import Home from "./Pages/Home";
import Container from "./Layout/Container";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Container>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/cadastro" element={<Cadastro />} />

            <Route path="/listagem" element={<Listagem />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
