// PopupFormAlmacen.jsx
import React, { useState } from "react";
import axios from "axios";

const PopupFromProveedores = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    producto: "",
    fechaEntrega: "",
    nombreEmpresa: "",
    RUC: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  // Agrega esta línea para verificar los datos
    axios.post("http://localhost:8081/home/proveedores", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    onSave(formData);
    onClose();
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
      <div className="relative w-full max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="producto"
            className="block text-sm font-medium text-gray-700"
          >
            Producto:
          </label>
          <input
            type="text"
            id="producto"
            name="producto"
            onChange={(e) => setFormData({ ...formData, producto: e.target.value})}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />

          <label
            htmlFor="fechaEntrega"
            className="block w-full mt-4 text-sm font-medium text-gray-700"
          >
            Fecha entrega:
          </label>
          <input
            type="date"
            id="fechaEntrega"
            name="fechaEntrega"
            onChange={(e) => setFormData({ ...formData, fechaEntrega: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="nombreEmpresa"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Nombre Empresa:
          </label>
          <input
            type="text"
            id="nombreEmpresa"
            name="nombreEmpresa"
            onChange={(e) => setFormData({ ...formData, nombreEmpresa: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="RUC"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            RUC:
          </label>
          <input
            type="number"
            id="RUC"
            name="RUC"
            onChange={(e) => setFormData({ ...formData, RUC: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <div className="flex items-center justify-center space-x-4 mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Añadir
            </button>
          </div>
        </form>
        {/* Botón para cerrar la ventana emergente */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-1 px-2 m-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
        >
          <span className="text-sm">×</span>
        </button>
      </div>
    </div>
  );
};

export default PopupFromProveedores;
