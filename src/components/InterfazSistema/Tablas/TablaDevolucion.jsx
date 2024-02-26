import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupFormDevolucion from "../PopUps/PopUpAñadir/PopupFormDevolucion";
import TablePaginationActions from "../../Common/TablePaginationActions";
import FormatearFecha from "../../Common/FormatearFecha";
import { handleDeleteDevolucion } from "../../api/HandleDeleteDevolucion";
import { useFetch } from "../../api/useFetch";
import { handleGenerarInformeDevolucion } from "../../Common/ExcelCommon";
import { handleBuscar } from "../../utils/handleBuscar";
import { handleChangePage, handleChangeRowsPerPage, calculateEmptyRows } from "../../utils/TableUtils";


const TablaDevolucion = () => {
  const [updateTable, setUpdateTable] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [devolucionEditando, setDevolucionEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
 
///----- Llmado a la api-----///

  const {data, loading} = useFetch("http://localhost:8081/home/devolucion");

  useEffect(() => {
    if (data) {
      filterData();
    }
  }, [data, busqueda]);

  const filterData = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((devolucion) =>
      devolucion.producto.toLowerCase().includes(terminoBusqueda)
    );

    setFilteredData(datosFiltrados);
  };

//------ Fin de llamado a la api -----

  const handleEditar = (id) => {
    const devolucionEdit = data.find((devolucion) => devolucion.id_devolucion === id);
    setDevolucionEditando(devolucionEdit);
    setMostrarPopup(true);
  };

   const handleDelete = async (id_devolucion) => {
    try {
      await axios.delete(`http://localhost:8081/home/devolucion/${id_devolucion}`);
      setData((prevData) => prevData.filter((devolucion) => devolucion.id_devolucion !== id_devolucion));
      setUpdateTable(true);
    } catch (err) {
      console.log(err);
    }
  }; 
 

  const handleGenerarExcel = () => {
    handleGenerarInformeDevolucion(filteredData);
  }
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = calculateEmptyRows(rowsPerPage, filteredData, page);
  
  return (
    <div>
      <button
        onClick={() => setMostrarPopup(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Agregar Devolución
      </button>
      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="p-2 border border-gray-300 rounded-md ml-20 mr-2"
      />
      <button
        onClick={handleBuscar}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Buscar
      </button>
      <button
        onClick={handleGenerarExcel}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-10"
      >
        Generar Informe Excel
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha Devolución</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Tipo Cantidad</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Nombre Empresa</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          {(data !== null && filteredData.length > 0) && (
            <TableBody>
           
           {(rowsPerPage > 0
             ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             : filteredData
           ).map((devolucion, index) => (
             <TableRow key={index}>
               <TableCell>{devolucion.id_devolucion}</TableCell>
               <TableCell>{FormatearFecha(devolucion.fecha_devolucion)}</TableCell>
               <TableCell>{devolucion.producto}</TableCell>
               <TableCell>{devolucion.cantidad_devolucion}</TableCell>
               <TableCell>{devolucion.tipo_cantidad}</TableCell>
               <TableCell>{devolucion.ruc_devolucion}</TableCell>
               <TableCell>{devolucion.nombre_empresa}</TableCell>
               <TableCell>
                 <IconButton onClick={() => handleEditar(devolucion.id_devolucion)}>
                   <EditIcon />
                 </IconButton>
                 <IconButton onClick={() => handleDeleteDevolucion(devolucion.id_devolucion)}>
                   <DeleteIcon />
                 </IconButton>
               </TableCell>
             </TableRow>
           ))}
           {emptyRows > 0 && (
             <TableRow style={{ height: 53 * emptyRows }}>
               <TableCell colSpan={8} />
             </TableRow>
           )}
         </TableBody>
          )}
          
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
      {mostrarPopup && (
        <PopupFormDevolucion
          onClose={() => {
            setMostrarPopup(false);
            setDevolucionEditando(null);
          }}
          onSave={(data) => {
            console.log("Datos guardados:", data);
            setMostrarPopup(false);
            setDevolucionEditando(null);
          }}
          modoEdicion={true}
          devolucionEditando={devolucionEditando}
        />
      )}
    </div>
  );
};

export default TablaDevolucion;
