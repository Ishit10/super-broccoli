import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import AddEditProduct from "./pages/AddEditProduct";
import Nav from "./components/Nav";
import { setAuthToken } from "./services/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
const [user, setUser] = useState(() => {
  try {
    const stored = localStorage.getItem("user");
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
});

  useEffect(() => {
    if (token) setAuthToken(token);
    else setAuthToken(null);
  }, [token]);

  function handleLogin({ token, user }) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
    <div>
      <Nav user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/products" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/products" element={token ? <Products /> : <Navigate to="/login" />} />
        <Route path="/products/new" element={token ? <AddEditProduct /> : <Navigate to="/login" />} />
        <Route path="/products/edit/:id" element={token ? <AddEditProduct editMode /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
