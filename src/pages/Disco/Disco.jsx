import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Tracklist from "../../components/Tracklist/Tracklist";
import NotFound from "../NotFound/NotFound";

import { getDiscoById } from "../../services/discoService";

const Disco = () => {
  const { id } = useParams();
  const [disco, setDisco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDisco = async () => {
    try {
      const data = await getDiscoById(id);
      setDisco(data);
      setLoading(false);
    } catch (error) {
      setError("Disco no existe");
    }
  };

  useEffect(() => {
    cargarDisco();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (!disco || error) {
    console.log("disco no encontrado");
    return <NotFound />;
  }

  return (
    <div className="container py-4">
      <div className="row">
        {/* Portada */}
        <div className="col-md-4">
          <img
            src={`${import.meta.env.BASE_URL}${disco.portada}`}
            alt={disco.titulo}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Información */}
        <div className="col-md-8">
          <h1>{disco.titulo}</h1>
          <h3>{disco.artista}</h3>

          <div className="mt-3">
            <p>
              <strong>Año:</strong> {disco.anio}
            </p>

            <p>
              <strong>Género:</strong> {disco.genero}
            </p>

            <p>
              <strong>Sello:</strong> {disco.sello}
            </p>

            <p>
              <strong>Precio:</strong> ${disco.precio}
            </p>
          </div>

          <hr />

          <p>{disco.descripcion}</p>
        </div>
      </div>

      {disco.tracklist && (
        <div className="mt-5">
          <h2>Tracklist</h2>

          <Tracklist tracklist={disco.tracklist} />
        </div>
      )}
    </div>
  );
};

export default Disco;
