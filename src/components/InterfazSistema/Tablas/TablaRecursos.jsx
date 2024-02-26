import React, { useState, useEffect } from "react";
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
import PopupFormRecursos from "../PopUps/PopUpAñadir/PopupFormRecursos";
import TablePaginationActions from "../../Common/TablePaginationActions";
import FormatearFecha from "../../Common/FormatearFecha";



function TablaRecursos() {
  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [elementosPorPagina] = useState(5);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const obtenerRecursos = async () => {
    const respuesta = await axios.get('http://localhost:8081/home/recursos')
    const recursos = await respuesta.data;
    setData(recursos);
    // Actualizar la página actual a la primera página
    setPaginaActual(0);
  }
  
  useEffect(() => {
    obtenerRecursos()
  }, []);

  
  const handleEditar = (id) => {
    const usuarioEdit = data.find((usuario) => String(usuario.id_recursos) === String(id));
    setUsuarioEditando(usuarioEdit);
    setMostrarPopup(true);
  };

  const handleDelete = async (id_recursos) => {
    try {
      await axios.delete(`http://localhost:8081/home/recursos/${id_recursos}`);
      // Actualizar los datos localmente después de la eliminación
      setData(prevData => prevData.filter(item => item.id_recursos !== id_recursos));
    } catch (err) {
      console.log(err);
    }
  };
  
  const indiceInicial = paginaActual * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;
  const datosPaginaActual = data.slice(indiceInicial, indiceFinal);
  const handleSave = () => {
    // Cerrar el popup si es necesario
    setShowPopup(false);
    // Forzar la actualización de la tabla
    setUpdateTable((prevValue) => !prevValue);
  };
  return (
    <div>
      <div className="ml-10 mb-6">
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-10 mr-10"
      >
        Agregar Recursos
      </button>
        <input
          type="text"
          placeholder="Buscar por cargo..."
          className="p-2 border border-gray-300 rounded-md ml-0 mr-2"
        />
        <button
          className="bg-gray-500 hover.bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
        <button
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
              <TableCell>Nombre Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Fecha de Uso</TableCell>
              <TableCell>Distribuidor</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosPaginaActual.map((recurso, index) => (
              <TableRow key={index}>
                <TableCell>{recurso.id_recursos}</TableCell>
                <TableCell>{recurso.nombre_producto}</TableCell>
                <TableCell>{recurso.cantidad}</TableCell>
                <TableCell>{FormatearFecha(recurso.fecha_de_ingreso)}</TableCell>
                <TableCell>{recurso.distribuidor}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditar(recurso.id_recursos)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(recurso.id_recursos)}
                  >
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
        count={data.length}
        page={paginaActual}
        onPageChange={handlePaginaCambio}
        rowsPerPage={elementosPorPagina}
        rowsPerPageOptions={[]}
      />
      {mostrarPopup && (
        <PopupFormUser
          onClose={() => {
            setMostrarPopup(false);
            setUsuarioEditando(null);
          }}
          onSave={(data) => {
            console.log("Datos guardados:", data);
            setMostrarPopup(false);
            setUsuarioEditando(null);
          }}
          modoEdicion={true}
          usuarioEditando={usuarioEditando}
        />
      )}
      {showPopup && (
        <PopupFormRecursos onClose={() => setShowPopup(false)} onSave={handleSave} />
      )}
    </Paper>
    </div>
    
  );
}

export default TablaRecursos;