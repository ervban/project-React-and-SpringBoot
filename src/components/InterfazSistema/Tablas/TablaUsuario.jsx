import React, { useState,useRef, useEffect } from "react";
import PopupForm from "../PopUps/PopUpAñadir/PopupFormUsers";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx"; 
import TablePaginationActions from "../../Common/TablePaginationActions";



const TablaUsuario = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [elementosPorPagina] = useState(5);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  // Al principio de tu componente TablaUsuario
  const [updateTable, setUpdateTable] = useState(false);
  const tableRef = useRef();
  

  const handleSave = () => {
    // Cerrar el popup si es necesario
    setShowPopup(false);
    // Forzar la actualización de la tabla
    setUpdateTable((prevValue) => !prevValue);
  };

  const obtenerUsuarios = async () => {
    const respuesta = await axios.get("http://localhost:8081/home/usuarios");
    const usuarios = await respuesta.data;
    setData(usuarios);
    setFilteredData(usuarios);
  };

  useEffect(() => {
    obtenerUsuarios();
    setUpdateTable(false); // Résete a false después de actualizar la tabla
  }, [updateTable]);

  useEffect(() => {
    // Actualizar el estado de los datos filtrados cuando cambia la búsqueda
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((usuario) =>
      usuario.cargo.toLowerCase().includes(terminoBusqueda)
    );
    setFilteredData(datosFiltrados);
  }, [busqueda, data, updateTable]);

  const handleDelete = async (Id_usuarios) => {
    await axios
      .delete(`http://localhost:8081/home/usuarios/${Id_usuarios}`)
      .then((res) => {
        setUpdateTable(true); // Actualizar la tabla
        
      })
      .catch((err) => console.log(err));
  };

  const handlePaginaCambio = (event, newPage) => {
    setPaginaActual(newPage);
  };

  const handleEditar = (id) => {
    const usuarioEdit = filteredData.find(
      (usuario) => String(usuario.Id_usuarios) === String(id)
    );
    setUsuarioEditando(usuarioEdit);
    setMostrarPopup(true);
  };

  const indiceInicial = paginaActual * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;
  const datosPaginaActual = filteredData.slice(indiceInicial, indiceFinal);

  const handleBuscar = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((cargo) =>
      cargo.producto.toLowerCase().includes(terminoBusqueda)
    );

    setFilteredData(datosFiltrados);
    setUpdateTable(true); // Actualiza la tabla después de aplicar el filtro
  };
  const handleGenerarInforme = () => {
    const dataForExcel = [
      ["ID", "Usuario", "Cargo", "Contraseña"],
      ...filteredData.map((usuario) => [
        usuario.Id_usuarios,
        usuario.usuario,
        usuario.cargo,
        usuario.password,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");

    XLSX.writeFile(wb, "InformeUsuarios.xlsx");
  };

  return (
    <div>
      <div className="ml-10 mb-6">
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-10 mr-10"
      >
        Agregar Usuario
      </button>
        <input
          type="text"
          placeholder="Buscar por cargo..."
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
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="w-1/6 p-2">ID</TableCell>
                <TableCell className="w-1/6 p-2">Usuario</TableCell>
                <TableCell className="w-1/6 p-2">Cargo</TableCell>
                <TableCell className="w-1/6 p-2">Contraseña</TableCell>
                <TableCell className="w-1/6 p-2">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosPaginaActual.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="w-1/6 p-2">
                    {user.Id_usuarios}
                  </TableCell>
                  <TableCell className="w-1/6 p-2">{user.usuario}</TableCell>
                  <TableCell className="w-1/6 p-2">{user.cargo}</TableCell>
                  <TableCell className="w-1/6 p-2">{user.password}</TableCell>
                  <TableCell className="w-1/6 p-2">
                    <IconButton onClick={() => handleDelete(user.Id_usuarios)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={paginaActual}
          onPageChange={handlePaginaCambio}
          rowsPerPage={elementosPorPagina}
          rowsPerPageOptions={[]}
          ActionsComponent={TablePaginationActions}
        />
        {mostrarPopup && (
          <PopupForm
            onClose={() => {
              setMostrarPopup(false);
              setUsuarioEditando(null);
            }}
            onSave={(data) => {
              console.log("Datos guardados:", data);
              setMostrarPopup(false);
              setUsuarioEditando(null);
              // Actualiza la tabla directamente en este componente sin depender de setUpdateTable
              obtenerUsuarios();
            }}
          />
        )}
        {showPopup && (
        <PopupForm onClose={() => setShowPopup(false)} onSave={handleSave} />
      )}
      
      </Paper>
    </div>
  );
};

export default TablaUsuario;
