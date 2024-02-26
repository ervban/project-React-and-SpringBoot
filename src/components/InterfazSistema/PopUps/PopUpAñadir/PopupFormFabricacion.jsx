import React, { useState } from "react";
import axios from "axios";

const PopupFormFabricacion = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    numero_tablero: "",
    fecha_fabricacion: "",
    tamanio: "",
    trabajador_fabricacion: "",
    materiales: [{ nombre: "", cantidad: "" }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer algo con los datos, por ejemplo, llamar a una función onSave
    axios
      .post("http://localhost:8081/home/fabricacion", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    onSave(formData);
    // Cerrar el formulario después de guardar los datos
    onClose();
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMaterialChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      materiales: prevData.materiales.map((material, i) =>
        i === index ? { ...material, [field]: value } : material
      ),
    }));
  };

  const handleAgregarMaterial = () => {
    setFormData((prevData) => ({
      ...prevData,
      materiales: [...prevData.materiales, { nombre: "", cantidad: "" }],
    }));
  };

  const handleQuitarMaterial = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      materiales: prevData.materiales.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
      <div className="relative w-full max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="numTablero"
            className="block text-sm font-medium text-gray-700"
          >
            Numero Tablero:
          </label>
          <input
            type="text"
            id="numTablero"
            name="numTablero"
            value={formData.numTablero}
            onChange={(e) =>
              setFormData({ ...formData, numero_tablero: e.target.value })
            }
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />

          <label
            htmlFor="trabajador"
            className="block w-full mt-4 text-sm font-medium text-gray-700"
          >
            Trabajador:
          </label>
          <input
            type="text"
            id="trabajador"
            name="trabajador"
            value={formData.tablero}
            onChange={(e) =>
              setFormData({
                ...formData,
                trabajador_fabricacion: e.target.value,
              })
            }
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="fechaTablero"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Fecha:
          </label>
          <input
            type="date"
            id="fechaTablero"
            name="fechaTablero"
            onChange={(e) =>
              setFormData({ ...formData, fecha_fabricacion: e.target.value })
            }
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <label
            htmlFor="tamanio"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Tamaño:
          </label>
          <input
            type="text"
            id="tamanio"
            name="tamanio"
            onChange={(e) =>
              setFormData({ ...formData, tamanio: e.target.value })
            }
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <label
            htmlFor="materialNombre"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Material:
          </label>
          {formData.materiales.map((material, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                id={`materialNombre_${index}`}
                name={`materialNombre_${index}`}
                value={material.nombre}
                onChange={(e) => handleMaterialChange(e, index, "nombre")}
                className="flex-1 p-2 border border-gray-300 rounded-md w-9/12"
                placeholder="Nombre del material"
              />

              <input
                type="number"
                id={`materialCantidad_${index}`}
                name={`materialCantidad_${index}`}
                value={material.cantidad}
                onChange={(e) => handleMaterialChange(e, index, "cantidad")}
                className="p-2 border border-gray-300 rounded-md w-14"
                inputMode="numeric"
                onWheel={(e) => e.preventDefault()}
              />
              <button
                type="button"
                onClick={() => handleQuitarMaterial(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                -
              </button>
              {index === formData.materiales.length - 1 && (
                <button
                  type="button"
                  onClick={handleAgregarMaterial}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  +
                </button>
              )}
            </div>
          ))}

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

export default PopupFormFabricacion;
