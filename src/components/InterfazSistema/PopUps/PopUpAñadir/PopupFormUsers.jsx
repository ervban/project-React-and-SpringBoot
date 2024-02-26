// PopupForm.jsx
import React, { useState } from "react";
import axios from "axios";
import TablaUsuario from "../../Tablas/TablaUsuario";

const PopupForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    usuario: "",
    cargo: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/home/usuarios", formData);
      onSave(response.data); // Llama a onSave con los datos actualizados
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
      <div className="relative w-full max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="usuario"
            className="block text-sm font-medium text-gray-700"
          >
            Usuario:
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) =>
              setFormData({ ...formData, usuario: e.target.value })
            }
          />

        <label
            htmlFor="cargo"
            className="block w-full mt-4 text-sm font-medium text-gray-700"
          >
            Cargo:
          </label>
          <select
            id="cargo"
            name="cargo"
            onChange={(e) =>
              setFormData({ ...formData, cargo: e.target.value })
            }
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecciona el tipo de cargo</option>
            <option value="administrador">administrador</option>
            <option value="trabajador">trabajador</option>
          </select>



          <label
            htmlFor="password"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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

export default PopupForm;
