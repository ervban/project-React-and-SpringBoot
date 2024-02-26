

export const handleBuscar = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    const datosFiltrados = data.filter((devolucion) =>
      devolucion.producto.toLowerCase().includes(terminoBusqueda)
    );
    setUpdateTable(true);
    setFilteredData(datosFiltrados);
  };