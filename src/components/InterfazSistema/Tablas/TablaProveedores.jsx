import React, { useState, useEffect } from "react";
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
import TablePaginationActions from "../../Common/TablePaginationActions";


const TablaProveedores = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const anio = fechaObj.getFullYear();
  
    return `${dia}/${mes}/${anio}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/home/proveedores');
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
    console.log(`Editar proveedor con ID ${id}`);
  };

  const handleDelete = async (id_proveedores) => {
    await axios
      .delete(`http://localhost:8081/home/proveedores/${id_proveedores}`)
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Fecha de Entrega</TableCell>
              <TableCell>Nombre Empresa</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {(rowsPerPage > 0
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data
  ).map((proveedores, index) => (
    <TableRow key={index}>
      <TableCell>{proveedores.id_proveedores}</TableCell>
      <TableCell>{proveedores.producto}</TableCell>
      <TableCell>{formatearFecha(proveedores.fecha_entrega)}</TableCell>
      <TableCell>{proveedores.nombre_empresa}</TableCell>
      <TableCell>{proveedores.ruc}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleEditar(proveedores.id_proveedores)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(proveedores.id_proveedores)}>
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
    </div>
  );
};

export default TablaProveedores;
