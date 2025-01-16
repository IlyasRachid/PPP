import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // check if user is authenticated (e.g., by checking localStorage or context)

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // redirect if not authenticated
  }

  return children; // render the wrapped component if authenticated
};

export default ProtectedRoute;
