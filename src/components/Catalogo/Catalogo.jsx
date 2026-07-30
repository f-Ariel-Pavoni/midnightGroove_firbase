import { useSearchParams } from "react-router-dom";
import useDiscos from "../../hooks/useDiscos";
import FiltroSelect from "../FiltroSelect/FiltroSelect";
import TarjetaDisco from "../TarjetaDisco/TarjetaDisco";
import ListaDiscos from "../ListaDiscos/ListaDiscos";

const Catalogo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { discos, loading, error } = useDiscos();
  const generos = [...new Set(discos.map((disco) => disco.genero))];
  const genero = searchParams.get("genero") || "";
  const discosFiltrados = genero
    ? discos.filter((disco) => disco.genero === genero)
    : discos;

  const handleGeneroChange = (e) => {
    const valor = e.target.value;

    if (valor) {
      setSearchParams({ genero: valor });
    } else {
      setSearchParams({});
    }
  };

  if (loading) {
    return <p>Cargando discos...</p>;
  }
  if (error) {
    return <p>No se pudieron cargar discos.</p>;
  }

  return (
    <>
      <FiltroSelect
        textoDefault="Todos los géneros"
        id="filtro-genero"
        opciones={generos}
        valor={genero}
        onChange={handleGeneroChange}
        label="Filtrar por género"
      />

      <ListaDiscos
        discos={discosFiltrados}
        renderCard={(disco) => <TarjetaDisco disco={disco} />}
      />
    </>
  );
};

export default Catalogo;
