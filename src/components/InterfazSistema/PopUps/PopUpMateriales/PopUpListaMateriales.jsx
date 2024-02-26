import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const PopUpListaMateriales = ({ tableroId, onClose, materialDetails, setMaterialDetails}) => {
  const navigate = useNavigate();
  const [materiales, setMateriales] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenerMateriales = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/home/fabricacion/${tableroId}`);
        const fabricacion = response.data.materiales;
        console.log(response)
        setMaterialDetails(fabricacion);
      } catch (error) {
        console.error("Error al obtener materiales:", error.message);
      }
    };
    obtenerMateriales();
  }, [tableroId]);

  const popUp = (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Materiales para Fabricación{" "}
        </h2>
        {materialDetails && materialDetails.length > 0 ? (
            <ul>
              {materialDetails.map((material) => (
                <li key={material.id_material} className="mb-2">
                  <strong>{material.nombre}:</strong> {material.cantidad}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron materiales para la fabricación con el id especificado.</p>
          )}
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(popUp, document.body);
};

export default PopUpListaMateriales;
