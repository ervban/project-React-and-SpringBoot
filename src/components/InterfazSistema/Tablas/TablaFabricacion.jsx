import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import PopUpListaMateriales from "../PopUps/PopUpMateriales/PopUpListaMateriales";
import * as XLSX from "xlsx";
import PopupFormFabricacion from "../PopUps/PopUpAñadir/PopupFormFabricacion";
import TablePaginationActions from "../../Common/TablePaginationActions";
import FormatearFecha from "../../Common/FormatearFecha";




const TablaFabricacion = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [selectedTableroId, setSelectedTableroId] = useState(null);
  const [materialDetails, setMaterialDetails] = useState(null);
  const [filtroTamanio, setFiltroTamanio] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const obtenerAlmacen = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/home/fabricacion/`
        );
        const almacen = respuesta.data;
        setData(almacen);
        setFilteredData(almacen);
        if (updateTable) {
          setUpdateTable(false); 
        }
      } catch (error) {
        console.error("Error al obtener datos de fabricación:", error);
      }
    };
    setUpdateTable(false)
    obtenerAlmacen();
  }, [updateTable]);

  const handleOpenPopup = async (id_fabricacion) => {
    setSelectedTableroId(id_fabricacion);

    try {
      const response = await axios.get(
        `http://localhost:8081/home/fabricacion/${id_fabricacion}`
      );
      setMaterialDetails(response.data.response || []);
    } catch (error) {
      console.error("Error al obtener detalles del material:", error);
    }
  };

  const handleDelete = async (id_fabricacion) => {
    await axios
      .delete(`http://localhost:8081/home/fabricacion/${id_fabricacion}`)
      .then((res) => {
        location.reload(Box);
      })
      .catch((err) => console.log(err));
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClosePopup = () => {
    setSelectedTableroId(null);
  };

  const handleSave = (data) => {
    console.log("Datos guardados:", data);
    setUpdateTable((prevValue) => !prevValue);
    handleClosePopup();
  };

  // Modificar la función handleBuscar para incluir la búsqueda por tamaño
  const handleBuscar = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((fabricacion) =>
      fabricacion.tamanio.toLowerCase().includes(terminoBusqueda)
    );

    setFilteredData(datosFiltrados);
    setUpdateTable(true); // Actualiza la tabla después de aplicar el filtro
  };

  useEffect(() => {
    // Actualizar el estado de los datos filtrados cuando cambia la búsqueda
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((fabricacion) =>
      fabricacion.tamanio.toLowerCase().includes(terminoBusqueda)
    );

    setFilteredData(datosFiltrados);
  }, [busqueda, data]);
  const handleGenerarInforme = () => {
    // Crear una hoja de cálculo en formato array de arrays
    const dataForExcel = [
      [
        "ID",
        "Numero De Tablero",
        "Trabajador",
        "Fecha",
        "Tamaño",
        "Material",
      ],
      ...filteredData.map((tablero) => [
        tablero.id_fabricacion,
        tablero.numero_tablero,
        tablero.trabajador_fabricacion,
        FormatearFecha(tablero.fecha_fabricacion),
        tablero.tamanio,
        // Puedes incluir más campos según tu necesidad
      ]),
    ];

    // Crear un objeto de libro de Excel
    const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fabricacion");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, "InformeFabricacion.xlsx");
  };
  return (
    <div>
      <div className="ml-10 mb-6">
      <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-10 mr-10"
        >
          Agregar Tablero
        </button>
        <input
          type="text"
          placeholder="Buscar por tamaño..."
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
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Numero De Tablero</TableCell>
                <TableCell>Trabajador</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Tamaño</TableCell>
                <TableCell>Material</TableCell>
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
              ).map((tablero) => (
                <TableRow key={tablero.id_fabricacion}>
                  <TableCell>{tablero.id_fabricacion}</TableCell>
                  <TableCell>{tablero.numero_tablero}</TableCell>
                  <TableCell>{tablero.trabajador_fabricacion}</TableCell>
                  <TableCell>
                    {FormatearFecha(tablero.fecha_fabricacion)}
                  </TableCell>
                  <TableCell>{tablero.tamanio}</TableCell>
                  <TableCell>
                    {tablero.id_fabricacion && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenPopup(tablero.id_fabricacion)}
                      >
                        Ver Material
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(tablero.id_fabricacion)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={7}
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
          style={{
            float: "right",
            paddingRight: "16px",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        {selectedTableroId !== null && (
          <PopUpListaMateriales
            tableroId={selectedTableroId}
            materialDetails={materialDetails}
            onClose={handleClosePopup}
            setData={setData}
            setMaterialDetails={setMaterialDetails}
          />
        )}
        {showPopup && (
        <PopupFormFabricacion onClose={() => setShowPopup(false)} onSave={handleSave} />
      )}
      </Box>
    </div>
  );
};

export default TablaFabricacion;
