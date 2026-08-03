import { useState, useMemo } from "react";
import Buscador from "../../components/Buscador/Buscador";
import Modal from "../../components/Modal/Modal";
import ModalEstado from "../../components/ModalEstado/ModalEstado";
import ListaDiscos from "../../components/ListaDiscos/ListaDiscos";
import TarjetaDiscoAdmin from "../../components/TarjetaDiscoAdmin/TarjetaDiscoAdmin";
import FormularioDisco from "../../components/FormularioDisco/FormularioDisco";
import useDiscosAdmin from "../../hooks/useDiscosAdmin";

const AdministrarDiscos = () => {
  const [busqueda, setBusqueda] = useState("");
  const { discos, loading, error, desactivar, toggleEstado, crearDisco } =
    useDiscosAdmin();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState(null);
  const [accion, setAccion] = useState(null);
  const [mensajeAccion, setMensajeAccion] = useState(null);
  const [mensajeAccionBtn, setMensajeAccionBtn] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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

  const handleNuevoDisco = () => {
    setMostrarFormulario(true);
    console.log("Vas a agregar un disco");
  };

  if (loading) {
    return <p>Cargando discos...</p>;
  }

  if (error) {
    return <p>No se pudieron cargar discos.</p>;
  }

  return (
    <>
      <h1>Administrar Discos</h1>
      <div className="row mb-3">
        <div className="col-auto">
          <button className="btn btn-dark" onClick={handleNuevoDisco}>
            + Agregar disco
          </button>
        </div>
        <div className="col">
          <Buscador
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            placeholder="Buscar disco..."
          />
        </div>
      </div>
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
      {mostrarFormulario && (
        <Modal onClose={() => setMostrarFormulario(false)} titulo="Nuevo disco">
          <FormularioDisco
            onClose={() => setMostrarFormulario(false)}
            crearDisco={crearDisco}
          />
        </Modal>
      )}
    </>
  );
};

export default AdministrarDiscos;
