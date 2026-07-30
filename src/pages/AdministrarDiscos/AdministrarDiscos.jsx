import { useState, useMemo } from "react";
import Buscador from "../../components/Buscador/Buscador";
import ModalEstado from "../../components/ModalEstado/ModalEstado";
import ListaDiscos from "../../components/ListaDiscos/ListaDiscos";
import TarjetaDiscoAdmin from "../../components/TarjetaDiscoAdmin/TarjetaDiscoAdmin";
import useDiscosAdmin from "../../hooks/useDiscosAdmin";

const AdministarDiscos = () => {
  const [busqueda, setBusqueda] = useState("");
  const { discos, loading, error, desactivar, toggleEstado } = useDiscosAdmin();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState(null);
  const [accion, setAccion] = useState(null);
  const [mensajeAccion, setMensajeAccion] = useState(null);
  const [mensajeAccionBtn, setMensajeAccionBtn] = useState(null);

  const discosFiltrados = useMemo(() => {
    if (!busqueda) return discos;

    return discos.filter((disco) =>
      disco.titulo.toLowerCase().includes(busqueda.toLowerCase()),
    );
  }, [discos, busqueda]);

  const editarDisco = () => {
    console.log("editar disco");
  };

  const desactivarDisco = (firebaseId) => {
    console.log("desactivar disco");
    setMostrarModal(true);
    setTipoMensaje("alerta");
    setMensajeAccionBtn("Desactivar");
    setAccion(() => () => desactivar(firebaseId));
    setMensajeAccion("Vas a desactivar el disco");
  };

  const cambiarEstado = (disco) => {
    const accionTexto = disco.activo ? "Desactivar" : "Activar";
    console.log("Cambiar estado disco");
    console.log(disco.titulo, disco.firebaseId);

    setMostrarModal(true);
    setTipoMensaje("alerta");
    setMensajeAccionBtn(accionTexto);
    setAccion(() => () => toggleEstado(disco.firebaseId));
    setMensajeAccion(`${accionTexto} disco "${disco.titulo}"`);
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
            cambiarEstado={cambiarEstado}
          />
        )}
      />
      {mostrarModal && (
        <ModalEstado
          tipo={tipoMensaje}
          mensaje={mensajeAccion}
          textoAccion={mensajeAccionBtn}
          onClose={() => setMostrarModal(false)}
          accion={accion}
        />
      )}
    </>
  );
};

export default AdministarDiscos;
