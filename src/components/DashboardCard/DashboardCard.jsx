import { Link } from "react-router-dom";

const DashboardCard = ({ titulo, descripcion, ruta, botonTexto, color }) => {
  {
    return (
      <div className="card  shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text text-muted">{descripcion}</p>
          <Link to={ruta} className={`btn btn-${color}`}>
            {botonTexto}
          </Link>
        </div>
      </div>
    );
  }
};

export default DashboardCard;
