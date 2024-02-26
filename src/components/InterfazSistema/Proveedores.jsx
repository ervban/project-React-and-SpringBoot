import React, { useState } from "react";
import TablaProveedores from "./Tablas/TablaProveedores";
import PopupFromProveedores from "./PopUps/PopUpAñadir/PopupFromProveedores";


const Proveedores = () => {
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
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Agregar Entrega
        </button>
        <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 ml-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Reporte
      </button>
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="p-2 border border-gray-300 rounded-md ml-20 mr-2"
        />
        <button
          onClick={handleBuscar}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
        {showPopup && (
          <PopupFromProveedores onClose={() => setShowPopup(false)} onSave={handleSave} />
        )}
        {/* Puedes agregar una lista de usuarios u otras secciones relacionadas con usuarios */}

        <TablaProveedores />
      </div>
  );
};

export default Proveedores;