import axios from "axios";
import React from "react";


export const handleDeleteDevolucion = async (id_devolucion, setData, setUpdateTable) => {
  try {
    await axios.delete(
      `http://localhost:8081/home/devolucion/${id_devolucion}`
    );
    setData((prevData) =>
      prevData.filter(
        (devolucion) => devolucion.id_devolucion !== id_devolucion
      )
    );
    setUpdateTable(true);
  } catch (err) {
    console.log(err);
  }
};
