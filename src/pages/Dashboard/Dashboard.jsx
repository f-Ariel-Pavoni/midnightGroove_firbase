import DashboardCard from "../../components/DashboardCard/DashboardCard";

function Dashboard() {
  return (
    <div className="container py-4">
      <h1 className="mb-3">Panel de Administración</h1>
      <p className="text-muted mb-4">
        Gestiona el catálogo y los usuarios de Midnight Groove.
      </p>
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
  );
}

export default Dashboard;
