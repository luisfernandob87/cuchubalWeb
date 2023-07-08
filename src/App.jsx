import "./App.css";
import { Footer } from "./components/Footer";
import { FuncionalidadesInicio } from "./components/FuncionalidadesInicio";
import { InfoInicio } from "./components/InfoInicio";
import { MenuInicio } from "./components/MenuInicio";
import { RotuloInicio } from "./components/RotuloInicio";

function App() {
  return (
    <>
      <MenuInicio />
      <InfoInicio />
      <RotuloInicio />
      <FuncionalidadesInicio />
      <Footer />
    </>
  );
}

export default App;
