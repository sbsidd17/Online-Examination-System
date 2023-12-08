
import AdminRoutes from './AdminRoutes'
import ExamsRoutes from './ExamsRoutes'
import UserRoutes from './UserRoutes'

function AllRoutes() {
  return (
    <>
      <UserRoutes />
      <ExamsRoutes />
      <AdminRoutes />
    </>
  )
}

export default AllRoutes
