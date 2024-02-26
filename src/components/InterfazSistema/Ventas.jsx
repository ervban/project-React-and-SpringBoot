import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PopupFormVentas from './PopUps/PopUpAñadir/PopupFormVentas';
import TablaVentas from "./Tablas/TablaVentas";

const Ventas = () => {

  return (
    <div>
      
      <TablaVentas />
    </div>
  );
};

export default Ventas;
