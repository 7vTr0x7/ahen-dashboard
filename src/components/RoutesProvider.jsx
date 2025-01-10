import React, { createContext, useState, useEffect } from "react";
import routes from "../routes";

export const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  const updateRoutes = () => {
    const vendorId = localStorage.getItem("vendorId");
    const subadmin = localStorage.getItem("subadmin");

    let updatedRoutes = routes;

    if (subadmin) {
      try {
        const { page_access } = JSON.parse(subadmin);

        if (page_access) {
          const accessiblePaths = page_access
            .split(",")
            .map((path) => path.trim().replace(/_/g, "-"));

          updatedRoutes = routes.filter((route) =>
            accessiblePaths.includes(route.path)
          );
        }
      } catch (error) {
        console.error("Error parsing subadmin data:", error);
      }
    }

    if (vendorId) {
      updatedRoutes = updatedRoutes.filter((route) => route.name !== "Sign In");
    }

    setFilteredRoutes(updatedRoutes);
  };

  useEffect(() => {
    updateRoutes();
  }, []);

  return (
    <RoutesContext.Provider value={{ filteredRoutes, updateRoutes }}>
      {children}
    </RoutesContext.Provider>
  );
};
