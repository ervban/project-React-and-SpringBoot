// Usuario.jsx
import React, { useState } from "react";
import PopupForm from "./PopUps/PopUpAñadir/PopupFormFabricacion";
import TablaUsuario from "./Tablas/TablaFabricacion";

const Fabricacion = () => {
  const [busqueda, setBusqueda] = useState("");

  const handleSave = (data) => {
    // Aquí podrías hacer algo con los datos, por ejemplo, enviarlos a través de una API
    console.log("Datos guardados:", data);
  };

  const handleBuscar = () => {
    // Lógica para manejar la acción de búsqueda
    console.log("Búsqueda:", busqueda);
    // Puedes realizar operaciones de búsqueda con el valor   en 'busqueda'
  };

  return (
    <div>
      <TablaUsuario />
    </div>
  );
};

export default Fabricacion;
