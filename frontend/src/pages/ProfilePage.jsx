// src/pages/ProfilePage.js
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  localStorage.setItem("authToken", "1234");
  const authToken = localStorage.getItem("authToken");

  // If no token or not authenticated, redirect to login
  if (!authToken || !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    // You can add a loading state or error handling here
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
