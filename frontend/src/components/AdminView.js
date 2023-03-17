import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { adminView } from "../services/AuthenticationService";

export default function AdminView({ component: Component }) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const getAdminView = async () => {
      try {
        const res = await adminView();
        setIsAdmin(res.data.isAdmin);
      } catch (error) {
        setIsAdmin(false);
      }
    };
    getAdminView();
  }, []);

  if (isAdmin === null) {
    return null;
  }
  return isAdmin ? <Component /> : <Navigate to="/restricted" />;
}
