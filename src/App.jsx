import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Inicio from "./pages/Inicio/Inicio";
import Nosotros from "./pages/Nosotros/Nosotros";
import Contacto from "./pages/Contacto/Contacto";
import Disco from "./pages/Disco/Disco";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdministarDiscos from "./pages/AdministrarDiscos/AdministrarDiscos";
import RutaProtegida from "./components/RutaProtegida/RutaProtegida";
import AdministarUsuarios from "./pages/AdministrarUsuarios/AdministarUsuarios";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Inicio />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="disco/:id" element={<Disco />} />

        <Route element={<RutaProtegida />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/discos" element={<AdministarDiscos />} />
          <Route path="dashboard/usuarios" element={<AdministarUsuarios />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
