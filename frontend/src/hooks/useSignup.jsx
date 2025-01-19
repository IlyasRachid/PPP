import { useState } from "react";

import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({ name, email, password, passwordConfirm }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.message);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      navigate("/home");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};
