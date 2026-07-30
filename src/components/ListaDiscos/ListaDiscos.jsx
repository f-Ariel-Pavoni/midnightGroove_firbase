const ListaDiscos = ({ discos, renderCard }) => {
  if (discos.length === 0) {
    return <p>No hay discos disponibles para mostrar.</p>;
  }

  return (
    <div className="row g-4">
      {discos.map((disco) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={disco.id}>
          {renderCard(disco)}
        </div>
      ))}
    </div>
  );
};

export default ListaDiscos;
