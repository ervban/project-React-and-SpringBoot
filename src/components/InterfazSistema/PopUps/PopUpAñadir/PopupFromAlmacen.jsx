// PopupFormAlmacen.jsx
import React, { useState } from "react";
import axios from "axios";
import TablaAlmacen from "../../Tablas/TablaAlmacen";


const PopupFromAlmacen = ({ onClose, onSave }) => {

  const [formData, setFormData] = useState({
    producto: "",
    marca_modelo: "",
    precio: "",
    cantidad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  // Agrega esta línea para verificar los datos
    axios.post("http://localhost:8081/home/almacen", formData)
      .then((res) => {
        console.log(res)
        location.reload(TablaAlmacen);
      })
      .catch((err) => console.log(err));
    onSave(formData);
    onClose();
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
      <div className="relative w-full max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="usuario"
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
            htmlFor="marca_modelo"
            className="block w-full mt-4 text-sm font-medium text-gray-700"
          >
            Marca / Modelo:
          </label>
          <input
            type="text"
            id="marca_modelo"
            name="marca_modelo"
            onChange={(e) => setFormData({ ...formData, marca_modelo: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="precio"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Precio:
          </label>
          <input
            type="number"
            id="precio"
            name="precio"
            onChange={(e) => setFormData({ ...formData, precio: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="cantidad"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Cantidad:
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value})}
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

export default PopupFromAlmacen;
