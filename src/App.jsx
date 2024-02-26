import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";

import Login from "./components/Login";
import Usuario from "./components/InterfazSistema/Usuario";
import Ventas from "./components/InterfazSistema/Ventas";
import Fabricacion from "./components/InterfazSistema/Fabricacion";
import Almacen from "./components/InterfazSistema/Almacen";
import Home from "./components/Home";
import Proveedores from './components/InterfazSistema/Proveedores';
import Servicios from './components/InterfazSistema/Servicios';
import Trabajadores from './components/InterfazSistema/Trabajadores';
import Devolucion from "./components/InterfazSistema/Devolucion";
import DashBoard from "./components/InterfazSistema/DashBoard";
import ServiciosCancelado from "./components/InterfazSistema/ServiciosCancelado";
import Reparacion from './components/InterfazSistema/Reparacion';
import Recursos from './components/InterfazSistema/Recursos';
import FormularioDevolucion from "./components/InterfazSistema/DataForms/FormularioDevolucion";


function App({handleLogin, onLogin}) {
 

  return (
    <Routes>
      <Route path="/logIn" render={() => {
        return user ? <Redirect to='/home/dashboard' /> : <Login />
      }} element={<Login onLogin={handleLogin} />} />
      <Route path="/*" element={<Home />}>
        <Route path="home/usuarios" element={<Usuario />} />
        <Route path="home/trabajadores" element={<Trabajadores />} />
        <Route path="home/almacen" element={<Almacen />} />
        <Route path="home/ventas" element={<Ventas />} />
        <Route path="home/proveedores" element={<Proveedores />} />
        <Route path="home/fabricacion" element={<Fabricacion />} />
        <Route path="home/devolucion" element={<FormularioDevolucion />} />
        <Route path="home/dashboard" element={<DashBoard />} />
        <Route path="home/servicioCancelado" element={<ServiciosCancelado />} />
        <Route path="home/servicios" element={<Servicios />} />
        <Route path="home/reparacion" element={<Reparacion />} />
        <Route path="home/recursos" element={<Recursos />} />
      </Route>
    </Routes>
  );
}

export default App;
