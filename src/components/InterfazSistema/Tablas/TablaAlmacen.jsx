import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PopupFromAlmacen from "../PopUps/PopUpAñadir/PopupFromAlmacen";
import * as XLSX from "xlsx";
import TablePaginationActions from "../../Common/TablePaginationActions";

const TablaAlmacen = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/home/almacen');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditar = (id) => {
    const productoEdit = data.find((producto) => producto.id_almacen === id);
    setProductoEditando(productoEdit);
    setMostrarPopup(true);
  };

  const handleDelete = async (id_almacen) => {
    await axios
      .delete(`http://localhost:8081/home/almacen/${id_almacen}`)
      .then((res) => {
        location.reload(Paper);
      })
      .catch((err) => console.log(err));
  };

  const handleBuscar = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    console.log("Término de búsqueda:", terminoBusqueda);
  
    const datosFiltrados = data.filter((almacen) =>
      almacen.producto.toLowerCase().includes(terminoBusqueda)
    );
    console.log("Datos filtrados:", datosFiltrados);
  
    setFilteredData(datosFiltrados);
  };
  
  const handleGenerarInforme = () => {
    if (filteredData.length === 0) {
      alert("No hay datos para generar el informe.");
      return;
    }

    const dataForExcel = [
      ["ID", "Producto", "Marca / Modelo", "Precio", "Cantidad"],
      ...filteredData.map((almacen) => [
        almacen.id_almacen,
        almacen.producto,
        almacen.marca,
        almacen.precio,
        almacen.cantidad,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Almacen");

    XLSX.writeFile(wb, "InformeAlmacen.xlsx");
  };


  return (
    <div>
      <button
        onClick={() => setMostrarPopup(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Agregar Almacen
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
        onClick={handleGenerarInforme}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-10"
      >
        Generar Informe Excel
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Marca / Modelo</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((almacen, index) => (
              <TableRow key={index}>
                <TableCell>{almacen.id_almacen}</TableCell>
                <TableCell>{almacen.producto}</TableCell>
                <TableCell>{almacen.marca}</TableCell>
                <TableCell>{almacen.precio}</TableCell>
                <TableCell>{almacen.cantidad}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditar(almacen.id_almacen)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(almacen.id_almacen)}>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={6}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Table>
      </TableContainer>
      {mostrarPopup && (
        <PopupFromAlmacen
          onClose={() => {
            setMostrarPopup(false);
            setProductoEditando(null);
          }}
          onSave={(data) => {
            console.log("Datos guardados:", data);
            setMostrarPopup(false);
            setProductoEditando(null);
          }}
          modoEdicion={true}
          productoEditando={productoEditando}
        />
      )}
    </div>
  );
};

export default TablaAlmacen;
