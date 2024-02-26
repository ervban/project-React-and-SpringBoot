import React, { useState } from "react";
import TablaServicios from "./Tablas/TablaServicios";
import PopupFormServicios from "./PopUps/PopUpAñadir/PopupFormServicios";


const Servicios = () => {
  const [showPopup, setShowPopup] = useState(false);
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
       
        
        {/* Puedes agregar una lista de usuarios u otras secciones relacionadas con usuarios */}

        <TablaServicios />
      </div>
  );
};

export default Servicios;
