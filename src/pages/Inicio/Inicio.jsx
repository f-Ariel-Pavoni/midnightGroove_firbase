import Catalogo from "../../components/Catalogo/Catalogo";
import AccesoAdmin from "../../components/AccesoAdmin/AccesoAdmin";
import Encabezado from "../../components/Encabezado/Encabezado";

function Inicio() {
  return (
    <>
      <Encabezado
        titulo="Catálogo de discos"
        bajada="Mirá nuestra collección de discos disponibles."
      />
      <Catalogo />
      <AccesoAdmin />
    </>
  );
}

export default Inicio;
