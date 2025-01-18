import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/SignIn";
import SignupPage from "./pages/SignUp";
import TicketListPage from "./pages/TicketListPage";
import MatchesPage from "./pages/MatchPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/protectedRoute";
import CheckoutPage from "./pages/Checkout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/tickets" element={<TicketListPage />} />
      <Route path="/matches" element={<MatchesPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
