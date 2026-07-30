import { useRef, useEffect } from "react";

const Buscador = ({ busqueda, setBusqueda, placeholder = "Buscar..." }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <label htmlFor="searchInput" className="visually-hidden">
        {placeholder}
      </label>

      <input
        id="searchInput"
        ref={inputRef}
        type="text"
        className="form-control mb-3"
        placeholder={placeholder}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </>
  );
};

export default Buscador;
