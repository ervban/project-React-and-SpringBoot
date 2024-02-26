import React, { useEffect, useState } from "react";
import axios from "axios";

function PopUpEditVentas({
  onClose,
  id_ventas,
  setEdicionDetalles,
  edicionDetalles,
}) {
  const [loading, setLoading] = useState(true);
  const [datosEditados, setdatosEditados] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/home/ventas/${id_ventas}`
        );
        const edicion = response.data.datosEditados;
        // Set formData after fetching data
        setFormData({
          producto: response.data[0].producto || "",
          fecha: new Date(response.data[0].fecha_ventas)
            .toISOString()
            .split("T")[0],
          cantidad: response.data[0].cantidad || "",
          tipoCantidad: response.data[0].tipo_cantidad || "",
          ruc: response.data[0].ruc || "",
          nombre: response.data[0].nombre_empresa || "",
        });

        setLoading(false);
        setEdicionDetalles(edicion);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id_ventas, setEdicionDetalles]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:8081/home/almacen");
      setProductos(response.data);
      console.log("Productos:", response.data); // Agrega este log
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8081/home/ventas/${id_ventas}`,
        formData
      );

      console.log("Server response:", response.data);
      onClose();

      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
        <div className="relative w-full max-w-md p-6 bg-white rounded-md shadow-lg">
          <form onSubmit={handleEdit}>
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
              onChange={handleInputChange}
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
              value={formData.fecha}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              value={formData.tipoCantidad}
              onChange={handleInputChange}
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
              value={formData.ruc}
              onChange={handleInputChange}
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
              value={formData.nombre}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />

            <div className="flex items-center justify-center space-x-4 mt-4">
              <button
                onClick={handleEdit}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar
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
    </div>
  );
}

export default PopUpEditVentas;
