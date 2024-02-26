import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PopUpEditVentas from "../PopUps/PopUpEdicion/PopUpEditVentas";
import * as XLSX from "xlsx";
import PopupFormVentas from "../PopUps/PopUpAñadir/PopupFormVentas";
import TablePaginationActions from "../../Common/TablePaginationActions";
import FormatearFecha from "../../Common/FormatearFecha";


const TablaVentas = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUpEditOpen, setPopUpEditOpen] = useState(false);
  const [selectedIdEdicion, setSelectedIdEdicion] = useState(null);
  const [edicionDetalles, setEdicionDetalles] = useState(null);
  const [updateTable, setUpdateTable] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const tableRef = useRef();
  const [paginaActual, setPaginaActual] = useState(0);
  const [page, setPage] = useState(0);

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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/home/ventas");
      setData(response.data);
      setFilteredData(response.data); // Actualiza los datos filtrados
      setLoading(false);
      if (updateTable) {
        setUpdateTable(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setUpdateTable(false);
    fetchData();
  }, [updateTable, edicionDetalles]);
  

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reinicia la página cuando cambia la cantidad de filas por página
  };

  const handleEditar = async (id_ventas) => {
    setSelectedIdEdicion(id_ventas);
    setPopUpEditOpen(true);
  };
  const handleSaveEdicion = async () => {
    // Lógica para guardar la edición

    // Aquí deberías realizar la lógica para enviar la solicitud de edición al servidor
    // Puedes usar `selectedIdEdicion` para identificar la venta específica que se está editando

    // Después de guardar la edición, actualiza los datos
    await fetchData();

    // Cierra el popup de edición
    setPopUpEditOpen(false);
  };

  const handleDelete = async (id_ventas) => {
    await axios
      .delete(`http://localhost:8081/home/ventas/${id_ventas}`)
      .then((res) => {
        // Actualizar los datos después de eliminar
        setUpdateTable(true);
      })
      .catch((err) => console.log(err));
  };

  const handleBuscar = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((ventas) =>
      ventas.producto.toLowerCase().includes(terminoBusqueda)
    );
  
    setFilteredData(datosFiltrados);
    setPage(0); // Reinicia la página al realizar una búsqueda
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
          Agregar Venta
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

      {busqueda ? (
        // Muestra la tabla filtrada cuando hay una búsqueda
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Tipo Cantidad</TableCell>
                <TableCell>RUC</TableCell>
                <TableCell>Nombre Empresa</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((ventas, index) => (
                <TableRow key={index}>
                  <TableCell>{ventas.id_ventas}</TableCell>
                  <TableCell>{FormatearFecha(ventas.fecha_ventas)}</TableCell>
                  <TableCell>{ventas.producto}</TableCell>
                  <TableCell>{ventas.cantidad}</TableCell>
                  <TableCell>{ventas.tipo_cantidad}</TableCell>
                  <TableCell>{ventas.ruc}</TableCell>
                  <TableCell>{ventas.nombre_empresa}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => handleEditar(ventas.id_ventas)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(ventas.id_ventas)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
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
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        // Muestra la tabla completa cuando no hay búsqueda
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Tipo Cantidad</TableCell>
                <TableCell>RUC</TableCell>
                <TableCell>Nombre Empresa</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((ventas, index) => (
                <TableRow key={index}>
                  <TableCell>{ventas.id_ventas}</TableCell>
                  <TableCell>{FormatearFecha(ventas.fecha_ventas)}</TableCell>
                  <TableCell>{ventas.producto}</TableCell>
                  <TableCell>{ventas.cantidad}</TableCell>
                  <TableCell>{ventas.tipo_cantidad}</TableCell>
                  <TableCell>{ventas.ruc}</TableCell>
                  <TableCell>{ventas.nombre_empresa}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => handleEditar(ventas.id_ventas)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(ventas.id_ventas)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
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
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      {showPopup && (
        <PopupFormVentas
          onClose={() => setShowPopup(false)}
          onSave={handleSave}
        />
      )}
      {popUpEditOpen && (
        <PopUpEditVentas
          onClose={() => setPopUpEditOpen(false)}
          onSave={handleSaveEdicion}
          id_ventas={selectedIdEdicion} // Pasa el ID de la venta a PopUpEditVentas
        />
      )}
    </div>
  );
};

export default TablaVentas;
