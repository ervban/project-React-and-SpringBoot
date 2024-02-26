import React, { useState } from "react";

function FormularioDevolucion() {
  const [formData, setFormData] = useState({
    producto: "",
    fechaDevolucion: "",
    cantidad: "",
    tipoCantidad: "",
    RUC: "",
    nombreEmpresa: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full  p-6 bg-white shadow-lg rounded-md">
        <form onSubmit={handleSubmit} className="flex justify-between">
          {/* Primera columna */}
          <div className="w-1/2 pr-4">
            <label
              htmlFor="producto"
              className="block text-sm font-medium text-gray-700"
            >
              Producto:
            </label>
            <select
              id="producto"
              name="producto"
              value={formData.producto}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona un producto</option>
              <option value="cableCobre">Cable de cobre</option>
              <option value="fusibles">Fusibles</option>
              <option value="panel">Panel</option>
            </select>
            <label
              htmlFor="fechaEntrega"
              className="block w-full mt-4 text-sm font-medium text-gray-700"
            >
              Fecha Devolucion:
            </label>
            <input
              type="date"
              id="fechaEntrega"
              name="fechaDevolucion"
              value={formData.fechaDevolucion}
              onChange={handleChange}
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
              value={formData.cantidad}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <div className="mt-4 flex justify-start">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-4 py-2 px-4 rounded"
              >
                Enviar
              </button>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Siguiente
              </button>
            </div>
          </div>
          {/* Segunda columna */}
          <div className="w-1/2 pl-4">
            
            <label
              htmlFor="tipoCantidad"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo Cantidad:
            </label>
            <select
              id="tipoCantidad"
              name="tipoCantidad"
              value={formData.tipoCantidad}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona el tipo de producto</option>
              <option value="metros">Metros</option>
              <option value="cantidad">Cantidad</option>
            </select>
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
              value={formData.RUC}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <label
              htmlFor="nombreEmpresa"
              className="block mt-4 text-sm font-medium text-gray-700"
            >
              Empresa:
            </label>
            <input
              type="text"
              id="nombreEmpresa"
              name="nombreEmpresa"
              value={formData.nombreEmpresa}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioDevolucion;
