import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <h3>Task Manager</h3>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
