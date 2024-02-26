import React from 'react'

const FormatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const anio = fechaObj.getFullYear();
  
    return `${dia}/${mes}/${anio}`;
  };

export default FormatearFecha