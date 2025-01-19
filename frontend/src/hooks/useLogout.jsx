import { useState } from "react";
import { useAuthContext } from "../context/authContext";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const user = localStorage.getItem("user");
  const { token } = JSON.parse(user);
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/users/logout", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.message);
      }
      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
