import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePaginationActions from "../../Common/TablePaginationActions";


const handleDelete = async (id_trabajadores) => {
  await axios
    .delete(`http://localhost:8081/home/trabajadores/${id_trabajadores}`)
    .then((res) => {
      location.reload();
    })
    .catch((err) => console.log(err));
};
const TablaReparacion = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/home/trabajadores');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>DNI</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Correo Electronico</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trabajadores, index) => (
            <TableRow key={index}>
              <TableCell>{trabajadores.id_trabajadores}</TableCell>
              <TableCell>{trabajadores.nombre_trabajador}</TableCell>
              <TableCell>{trabajadores.apellido_trabajador}</TableCell>
              <TableCell>{trabajadores.dni_trabajador}</TableCell>
              <TableCell>{trabajadores.celular}</TableCell>
              <TableCell>{trabajadores.correo_trabajador}</TableCell>
              <TableCell>{trabajadores.cargo}</TableCell>
              <TableCell>
                <IconButton onClick={() => console.log(`Editar usuario con ID ${reparacion.id_trabajadores}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(trabajadores.id_trabajadores)}>
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
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TablaReparacion;
