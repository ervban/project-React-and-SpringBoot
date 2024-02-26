import React, { useState } from "react";
import TablaDevolucion from "./Tablas/TablaDevolucion";
import PopupFormDevolucion from "./PopUps/PopUpAñadir/PopupFormDevolucion";

const Devolucion = () => {
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
        
        {showPopup && (
          <PopupFormDevolucion onClose={() => setShowPopup(false)} onSave={handleSave} />
        )}
        {/* Puedes agregar una lista de usuarios u otras secciones relacionadas con usuarios */}

        <TablaDevolucion />
      </div>
  );
};

export default Devolucion;


