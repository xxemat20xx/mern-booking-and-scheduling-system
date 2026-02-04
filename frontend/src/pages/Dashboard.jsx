import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async() => {
    await logout();
    navigate("/login")
  }
  return (
    <div>
        <h1 className='text-6xl font-bold'>Dashboard</h1>
        <button
          onClick={handleLogout}
        > Logout</button>
    </div>
  )
}

export default Dashboard