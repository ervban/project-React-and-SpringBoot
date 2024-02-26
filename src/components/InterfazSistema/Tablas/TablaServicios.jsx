import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PopupFormServicios from "../PopUps/PopUpAñadir/PopupFormServicios";
import * as XLSX from "xlsx";
import TablePaginationActions from "../../Common/TablePaginationActions";
import FormatearFecha from "../../Common/FormatearFecha";


const TablaServicios = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const tableRef = useRef();
  const [updateTable, setUpdateTable] = useState(false);

  const obtenerServicios = async () => {
    try {
      const respuesta = await axios.get('http://localhost:8081/home/servicios');
      setData(respuesta.data);
      if (updateTable) {
        setUpdateTable(false); // Restablecer el estado después de la actualización
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    obtenerServicios();
  }, [updateTable]);

  useEffect(() => {
    // Cuando se actualiza la tabla desde el exterior, actualiza los datos
    // y resetea la paginación
    setFilteredData(data);
    setPage(0);
  }, [data]);

  const handleSave = () => {
    setShowPopup(false);
    setUpdateTable((prevValue) => !prevValue);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id_servicios) => {
    try {
      await axios.delete(`http://localhost:8081/home/servicios/${id_servicios}`);
      setUpdateTable(true); // Actualizar la tabla después de eliminar
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleGenerarInforme = () => {
    // Crear una hoja de cálculo en formato array de arrays
    const dataForExcel = [
      [
        "ID",
        "Lugar",
        "Fecha",
        "Tipo Servicio",
        "RUC",
        "Numero Boleta",
        "Material",
        "Trabajador",
      ],
      ...filteredData.map((servicio) => [
        servicio.id_servicios,
        servicio.lugar,
        FormatearFecha(servicio.fecha_servicio),
        servicio.tipo_servicio,
        servicio.ruc_servicio,
        servicio.numero_boleta,
        servicio.material,
        servicio.trabajador_servicios,
      ]),
    ];

    // Crear un objeto de libro de Excel
    const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Servicios");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, "InformeServicios.xlsx");
  };
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };
  const handleBuscar = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((servicio) =>
      servicio.lugar.toLowerCase().includes(terminoBusqueda)
    );

    setFilteredData(datosFiltrados);
    setPage(0);
  };


  useEffect(() => {
    obtenerServicios();
    // Restablecer a false después de actualizar la tabla
    setUpdateTable(false);
  }, [updateTable, busqueda]);

  return (
    <div>
      <div className="ml-10 mb-6">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-10 mr-10"
        >
          Agregar Venta
        </button>

        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={handleBusquedaChange}
          className="p-2 border border-gray-300 rounded-md ml-0 mr-2"
        />
        <button
          onClick={handleBuscar}
          className="bg-gray-500 hover.bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
        <button
          onClick={handleGenerarInforme}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-10"
        >
          Generar Informe Excel
        </button>
      </div>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Lugar</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Tipo Servicio</TableCell>
                <TableCell>RUC</TableCell>
                <TableCell>Numero boleta</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Trabajador</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredData
              ).map((servicio, index) => (
                <TableRow key={index}>
                  <TableCell>{servicio.id_servicios}</TableCell>
                  <TableCell>{servicio.lugar}</TableCell>
                  <TableCell>{FormatearFecha(servicio.fecha_servicio)}</TableCell>
                  <TableCell>{servicio.tipo_servicio}</TableCell>
                  <TableCell>{servicio.ruc_servicio}</TableCell>
                  <TableCell>{servicio.numero_boleta}</TableCell>
                  <TableCell>{servicio.material}</TableCell>
                  <TableCell>{servicio.trabajador_servicios}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => console.log(`Editar servicio con ID ${servicio.id_servicios}`)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(servicio.id_servicios)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={8}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
      {showPopup && (
        <PopupFormServicios onClose={() => setShowPopup(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default TablaServicios;
