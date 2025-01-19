import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/SignIn";
import SignupPage from "./pages/SignUp";
import TicketListPage from "./pages/TicketListPage";
import MatchesPage from "./pages/MatchPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/Checkout";
import { useAuthContext } from "./context/authContext";

const AppRoutes = () => {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route
        path="/home"
        element={authUser ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/Home" /> : <LoginPage />}
      />
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/checkout"
        element={authUser ? <CheckoutPage /> : <Navigate to="/login" />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/tickets"
        element={authUser ? <TicketListPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/matches"
        element={authUser ? <MatchesPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
