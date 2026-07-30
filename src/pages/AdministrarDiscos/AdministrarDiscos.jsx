import { useState, useMemo } from "react";
import Buscador from "../../components/Buscador/Buscador";
import ListaDiscos from "../../components/ListaDiscos/ListaDiscos";
import TarjetaDiscoAdmin from "../../components/TarjetaDiscoAdmin/TarjetaDiscoAdmin";
import useDiscos from "../../hooks/useDiscos";

const AdministarDiscos = () => {
  const [busqueda, setBusqueda] = useState("");
  const { discos, loading, error } = useDiscos();

  const discosFiltrados = useMemo(() => {
    if (!busqueda) return discos;

    return discos.filter((disco) =>
      disco.titulo.toLowerCase().includes(busqueda.toLowerCase()),
    );
  }, [discos, busqueda]);

  const editarDisco = () => {
    console.log("editar disco");
  };

  const eliminarDisco = () => {
    console.log("eliminar discos");
  };

  if (loading) {
    return <p>Cargando discos...</p>;
  }

  if (error) {
    return <p>No se pudieron cargar discos.</p>;
  }

  return (
    <>
      <h1>Administar Discos</h1>
      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        placeholder="Buscar disco..."
      />
      <ListaDiscos
        discos={discosFiltrados}
        layout="list"
        renderCard={(disco) => (
          <TarjetaDiscoAdmin
            disco={disco}
            editarDisco={editarDisco}
            eliminarDisco={eliminarDisco}
          />
        )}
      />
    </>
  );
};

export default AdministarDiscos;
