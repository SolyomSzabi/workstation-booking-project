import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/admin/Header-admin";
import Footer from "./components/admin/Footer-admin";
import Users from "./components/admin/Users";
import SelectBuilding from "./components/admin/SelectBuilding";
import WorkstationsTable from "./components/admin/WorkstationsTable";
import FloorManagement from "./components/admin/FloorManagement";
import AdminView from "./components/AdminView";
import LoginForm from "./components/LoginForm";
import AddNewBuilding from "./components/admin/AddNewBuilding";
import EditBuilding from "./components/admin/EditBuilding";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AdminView component={SelectBuilding} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/buildings" element={<AdminView component={SelectBuilding} />} />
        <Route path="/admin/users" element={<AdminView component={Users} />} />
        <Route path="/admin/workstations" element={<AdminView component={WorkstationsTable} />} />
        <Route path="/admin/floors" element={<AdminView component={FloorManagement} />} />
        <Route
          path="/admin/buildings/:id/floors"
          element={<AdminView component={FloorManagement} />}
        />
        <Route path="/restricted" element={<div>Only accessible by admin users!</div>} />
        <Route path="/admin/buildings/add" element={<AdminView component={AddNewBuilding} />} />
        <Route path="/admin/buildings/edit" element={<AdminView component={EditBuilding} />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
