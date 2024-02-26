import React, { useState } from "react";
import TablaAlmacen from "./Tablas/TablaAlmacen";
import PopupFromAlmacen from "./PopUps/PopUpAñadir/PopupFromAlmacen";


const Almacen = () => {
  const [showPopup, setShowPopup] = useState(false);
 

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
          <PopupFromAlmacen onClose={() => setShowPopup(false)} onSave={handleSave} />
        )}
        {/* Puedes agregar una lista de usuarios u otras secciones relacionadas con usuarios */}

        <TablaAlmacen />
      </div>
  );
};

export default Almacen;
