import React, { useEffect, useState } from "react";
import axios from "axios";

function PopUpEdicionPedido({
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
          fecha: new Date(response.data[0].fecha_ventas).toISOString().split('T')[0],
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
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
      <div className="relative w-full max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="lugar"
            className="block text-sm font-medium text-gray-700"
          >
            Lugar:
          </label>
          <input
            type="text"
            id="lugar"
            name="lugar"
            onChange={(e) => setFormData({ ...formData, lugar: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha:
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            onChange={(e) => setFormData({ ...formData, fechaServicio: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />

          <label
            htmlFor="tipoServicio"
            className="block w-full mt-4 text-sm font-medium text-gray-700"
          >
            Tipo Servicio:
          </label>
          <input
            type="text"
            id="tipoServicio"
            name="tipoServicio"
            onChange={(e) => setFormData({ ...formData, tipoServicio: e.target.value})}
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
          <label
            htmlFor="numeroBoleta"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Numero Boleta:
          </label>
          <input
            type="number"
            id="numeroBoleta"
            name="numeroBoleta"
            onChange={(e) => setFormData({ ...formData, numeroBoleta: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <label
            htmlFor="material"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Material:
          </label>
          <input
            type="text"
            id="material"
            name="material"
            onChange={(e) => setFormData({ ...formData, material: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <label
            htmlFor="trabajador"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Trabajador:
          </label>
          <input
            type="text"
            id="trabajador"
            name="trabajador"
            onChange={(e) => setFormData({ ...formData, trabajador: e.target.value})}
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
}


export default PopUpEdicionPedido