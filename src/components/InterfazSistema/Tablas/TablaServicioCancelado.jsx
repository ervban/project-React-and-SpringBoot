import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from "@emotion/react";
import Box from '@mui/material/Box';
import TablePaginationActions from "../../Common/TablePaginationActions";
import FormatearFecha from "../../Common/FormatearFecha";




const TablaServicioCancelado = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [elementosPorPagina] = useState(5); // Número de elementos por página
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const obtenerServicioCancelado = async () => {
    const respuesta = await axios.get('http://localhost:8081/home/servicioCancelado');
    const devolucion = respuesta.data;
    setData(devolucion);
  };

  useEffect(() => {
    obtenerServicioCancelado();
  }, []);


  const indiceInicial = paginaActual * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;
  const datosPaginaActual = data.slice(indiceInicial, indiceFinal);

  const handlePaginaCambio = (event, newPage) => {
    setPaginaActual(newPage);
  };

  const theme = useTheme();

  const handleFirstPageButtonClick = () => {
    setPaginaActual(0);
  };

  const handleBackButtonClick = () => {
    setPaginaActual((prev) => prev - 1);
  };

  const handleNextButtonClick = () => {
    setPaginaActual((prev) => prev + 1);
  };

  const handleLastPageButtonClick = () => {
    setPaginaActual(Math.max(0, Math.ceil(data.length / elementosPorPagina) - 1));
  };

  const handleDelete = async (id_servicios_cancelados) => {
    await axios
      .delete(`http://localhost:8081/home/servicioCancelado/${id_servicios_cancelados}`)
      .then((res) => {
        location.reload(Paper);
      })
      .catch((err) => console.log(err));
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
              <TableCell>Lugar</TableCell>
              <TableCell>Tipo Servicio</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Fecha de Cancelacion</TableCell>
              <TableCell>Trabajador</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosPaginaActual.map((servicio_cancelados, index) => (
              <TableRow key={index}>
                <TableCell>{servicio_cancelados.id_servicios_cancelados}</TableCell>
                <TableCell>{servicio_cancelados.lugar_servic}</TableCell>
                <TableCell>{servicio_cancelados.tipo_servicio}</TableCell>
                <TableCell>{servicio_cancelados.ruc}</TableCell>
                <TableCell>{FormatearFecha(servicio_cancelados.fecha_cancelacion)}</TableCell>
                <TableCell>{servicio_cancelados.trabajador}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditar(servicio_cancelados.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(servicio_cancelados.id_servicios_cancelados)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationActions
        component="div"
        count={data.length}
        page={paginaActual}
        onPageChange={handlePaginaCambio}
        rowsPerPage={elementosPorPagina}
        rowsPerPageOptions={[]}
        ActionsComponent={(subProps) => (
          <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={paginaActual === 0}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
              onClick={handleBackButtonClick}
              disabled={paginaActual === 0}
              aria-label="previous page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={paginaActual >= Math.ceil(data.length / elementosPorPagina) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={paginaActual >= Math.ceil(data.length / elementosPorPagina) - 1}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </Box>
        )}
      />

    </Paper>
    {showPopup && (
        <PopupFormServicioCancelado onClose={() => setShowPopup(false)} onSave={handleSave} />
      )}

    </div>
    
  );
};

export default TablaServicioCancelado;
