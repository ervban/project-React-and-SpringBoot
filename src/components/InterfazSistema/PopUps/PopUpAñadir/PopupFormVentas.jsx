// PopupFormAlmacen.jsx
import React, { useEffect, useState } from "react";

import axios from "axios";
import TablaVentas from "../../Tablas/TablaVentas";

const PopupFormVentas = ({ onClose, onSave,  onTableUpdate, tableRef }) => {
  const [formData, setFormData] = useState({
    producto: "",
    fecha: "",
    cantidad: "",
    tipoCantidad: "",
    ruc: "",
    nombre: "",
  });

  const [productos, setProductos] = useState([]);
 
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8081/home/almacen");
        setProductos(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductos();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/home/ventas",
        formData
      );

      onSave(response.data);

      // Llamamos a la función de actualización de la tabla
      if (typeof onTableUpdate === "function") {
        onTableUpdate();
      }

      // Llamamos a la función de actualización de la tabla a través de la referencia
      if (tableRef.current && typeof tableRef.current.updateTableHandler === "function") {
        tableRef.current.updateTableHandler();
      }

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
            {productos.map((producto) => (
              <option key={producto.id_almacen} value={producto.producto}>
                {producto.producto}
              </option>
            ))}
          </select>
          <label
            htmlFor="fechaEntrega"
            className="block w-full mt-4 text-sm font-medium text-gray-700"
          >
            Fecha:
          </label>
          <input
            type="date"
            id="fechaEntrega"
            name="fechaEntrega"
            onChange={(e) =>
              setFormData({ ...formData, fecha: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, cantidad: e.target.value })
            }
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="tipoCantidad"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Tipo Cantidad:
          </label>
          <select
            id="tipoCantidad"
            name="tipoCantidad"
            onChange={(e) =>
              setFormData({ ...formData, tipoCantidad: e.target.value })
            }
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
            name="ruc"
            onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
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
            onChange={(e) =>
              setFormData({ ...formData, empresa: e.target.value })
            }
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

export default PopupFormVentas;
