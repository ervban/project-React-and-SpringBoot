import React, { useState } from 'react'



export const handleGenerarInforme = () => {
  const dataForExcel = [
    ["ID", "Fecha Devolucion", "Producto", "Cantidad", "Tipo Cantidad", "RUC", "Nombre Empresa"],
    ...filteredData.map((devolucion) => [
      devolucion.id_devolucion,
      FormatearFecha(devolucion.fecha_devolucion),
      devolucion.producto,
      devolucion.cantidad_devolucion,
      devolucion.tipo_cantidad,
      devolucion.ruc_devolucion,
      devolucion.nombre_empresa,
    ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Devoluciones");

  XLSX.writeFile(wb, "InformeDevolucion.xlsx");
};