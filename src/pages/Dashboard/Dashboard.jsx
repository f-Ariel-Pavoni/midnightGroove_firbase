import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Encabezado from "../../components/Encabezado/Encabezado";

function Dashboard() {
  return (
    <>
      <Encabezado
        titulo="Panel de Administración"
        bajada="Gestioná el catálogo y los usuarios de Midnight Groove."
      />
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-6">
            <DashboardCard
              titulo="Administrar Discos"
              descripcion="Crear, editar y eliminar discos del catálogo"
              ruta="/dashboard/discos"
              botonTexto="Gestionar"
              color="primary"
            />
          </div>
          <div className="col-md-6">
            <DashboardCard
              titulo="Usuarios"
              descripcion="Administrar usuarios del sistema."
              ruta="/dashboard/usuarios"
              botonTexto="Gestionar"
              color="success"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
