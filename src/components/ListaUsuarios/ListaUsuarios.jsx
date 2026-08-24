const ListaUsuarios = ({ usuarios, renderCard, layout }) => {
  if (usuarios.length === 0) {
    return <p>No hay usuarios disponibles para mostrar.</p>;
  }

  const obtenerClaseColumna = (layout) => {
    switch (layout) {
      case "grid-1":
        return "col-12";
      case "grid-2":
        return "col-12 col-md-6";
      case "grid-3":
        return "col-12 col-sm-6 col-md-4";
      case "list":
        return "col-12";
      default:
        return "col-12 col-sm-6 col-md-4";
    }
  };

  return (
    <div className="row g-4">
      {usuarios.map((usuario) => (
        <div className={obtenerClaseColumna(layout)} key={usuario.firebaseId}>
          {renderCard(usuario)}
        </div>
      ))}
    </div>
  );
};

export default ListaUsuarios;
