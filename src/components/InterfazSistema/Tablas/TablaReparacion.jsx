import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer"; // Agrega esta línea
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupFormReparacion from "../PopUps/PopUpAñadir/PopupFormReparacion";
import * as XLSX from "xlsx";
import TablePaginationActions from "../../Common/TablePaginationActions";
import FormatearFecha from "../../Common/FormatearFecha";



const TablaReparacion = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateTable, setUpdateTable] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const tableRef = useRef();
  const [paginaActual, setPaginaActual] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/home/reparacion"
        );
        setData(response.data);
        setLoading(false);
        if (updateTable) {
          setUpdateTable(false); // Restablecer el estado después de la actualización
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    setUpdateTable(false)
    fetchData();
  }, [updateTable]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id_reparacion) => {
    await axios
      .delete(`http://localhost:8081/home/reparacion/${id_reparacion}`)
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // Cuando se actualiza la tabla desde el exterior, actualiza los datos
    // y resetea la paginación
    setFilteredData(data);
    setPage(0);
  }, [data]);

  const handleSave = () => {
    // Cerrar el popup si es necesario
    setShowPopup(false);

    // Forzar la actualización de la tabla
    setUpdateTable((prevValue) => !prevValue);
  };
  const handleBuscar = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((reparacion) =>
      reparacion.nombre_empresa.toLowerCase().includes(terminoBusqueda)
    );
  
    setFilteredData(datosFiltrados);
    setPage(0); // Resetear la página a la primera después de aplicar el filtro
  };
  
  
  const handleGenerarInforme = () => {
    // Crear una hoja de cálculo en formato array de arrays
    const dataForExcel = [
      [
        "ID",
        "Fecha",
        "Producto",
        "Cantidad",
        "Tipo Cantidad",
        "RUC",
        "Nombre Empresa",
      ],
      ...filteredData.map((ventas) => [
        ventas.id_ventas,
        FormatearFecha(ventas.fecha_ventas),
        ventas.producto,
        ventas.cantidad,
        ventas.tipo_cantidad,
        ventas.ruc,
        ventas.nombre_empresa,
      ]),
    ];

    // Crear un objeto de libro de Excel
    const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, "InformeVentas.xlsx");
  };
  return (
    <div>
      <div className="ml-10 mb-6">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-10 mr-10"
        >
          Agregar Reparacion
        </button>

        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre Empresa</TableCell>
              <TableCell>Fecha Reparacion</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Tablero</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reparacion, index) => (
                <TableRow key={index}>
                  <TableCell>{reparacion.id_reparacion}</TableCell>
                  <TableCell>{reparacion.nombre_empresa}</TableCell>
                  <TableCell>
                    {FormatearFecha(reparacion.fecha_reparacion)}
                  </TableCell>
                  <TableCell>{reparacion.ruc_reparacion}</TableCell>
                  <TableCell>{reparacion.tamanio_tablero}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        console.log(
                          `Editar usuario con ID ${reparacion.id_reparacion}`
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(reparacion.id_reparacion)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {showPopup && (
          <PopupFormReparacion onClose={() => setShowPopup(false)} onSave={handleSave} />
        )}
    </div>
  );
};

export default TablaReparacion;
