const Encabezado = ({ titulo, bajada }) => {
  return (
    <div className="mt-1 mb-4 p-3">
      <h1 className="mb-1">{titulo}</h1>
      {bajada && <p className="text-muted mb-0">{bajada}</p>}
    </div>
  );
};

export default Encabezado;
