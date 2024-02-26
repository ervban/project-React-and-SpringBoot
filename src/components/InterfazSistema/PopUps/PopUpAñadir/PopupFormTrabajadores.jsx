import React, { useState } from "react";
import axios from 'axios';

const PopupFormTrabajadores = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombreTrabajador: "",
    apellidoTrabajador: "",
    dniTrabajador: "",
    celular: "",
    correoTrabajador: "",
    cargo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  // Agrega esta línea para verificar los datos
    axios.post("http://localhost:8081/home/trabajadores", formData)
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
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            onChange={(e) => setFormData({ ...formData, nombreTrabajador: e.target.value})}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />

          <label
            htmlFor="apellido"
            className="block w-full mt-4 text-sm font-medium text-gray-700"
          >
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            onChange={(e) => setFormData({ ...formData, apellidoTrabajador: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="dni"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            DNI:
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            onChange={(e) => setFormData({ ...formData, dniTrabajador: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="celular"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Celular:
          </label>
          <input
            type="text"
            id="celular"
            name="celular"
            onChange={(e) => setFormData({ ...formData, celular: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />


          <label
            htmlFor="correo"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Correo:
          </label>
          <input
            type="text"
            id="correo"
            name="correo"
            onChange={(e) => setFormData({ ...formData, correoTrabajador: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          
          <label
            htmlFor="cargo"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Cargo:
          </label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            onChange={(e) => setFormData({ ...formData, cargo: e.target.value})}
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

export default PopupFormTrabajadores