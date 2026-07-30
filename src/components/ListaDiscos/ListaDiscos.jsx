/*
  ListaDiscos recibe:
  
  layout:
    - "grid-1" → una columna
    - "grid-2" → dos columnas
    - "grid-3" → tres columnas (default)
    - "list"   → lista vertical para administración
*/

const ListaDiscos = ({ discos, renderCard, layout }) => {
  if (discos.length === 0) {
    return <p>No hay discos disponibles para mostrar.</p>;
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
      {discos.map((disco) => (
        <div className={obtenerClaseColumna(layout)} key={disco.id}>
          {renderCard(disco)}
        </div>
      ))}
    </div>
  );
};

export default ListaDiscos;
