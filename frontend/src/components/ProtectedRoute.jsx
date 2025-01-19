import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  if (!authUser) {
    return <Navigate to="/login" />; // redirect if not authenticated
  }

  return children; // render the wrapped component if authenticated
};

export default ProtectedRoute;
