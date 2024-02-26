import React from "react";
import PropTypes from "prop-types";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import logoEmpresa from "../assets/logoEmpresa.jpg";
import { Link } from "react-router-dom";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import SellIcon from "@mui/icons-material/Sell";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SourceIcon from "@mui/icons-material/Source";
import HandymanIcon from "@mui/icons-material/Handyman";
import GroupIcon from "@mui/icons-material/Group";
import EngineeringIcon from "@mui/icons-material/Engineering";

function NavBar() {
  const containerStyle = {    background: "#221e48",

    display: "flex",
    height: "100vh",
  };

  const sidebarStyle = {
    background: "#221e48",
    width: "200px",
    height: "100%", // Añadido para ocupar el 100% de la altura
  };

  const logoStyle = {
    
    width: "100px",
    height: "auto",
    margin: "10px auto", // Ajusta el margen superior aquí
  };

  const h2Style = {
    color: "#165a72",
    marginBottom: "40px",
    marginTop: "20px",
    fontSize: "24px",
  };

  const nav = {
    paddingTop: "0px",
    background: "#221e48",

  };

  return (
    <div style={containerStyle}>
      <ProSidebar style={sidebarStyle}>
        <Menu style={nav}>
          <MenuItem className="bg-white">
            <img
              src={logoEmpresa}
              alt="Logo Empresa"
              style={{ width: "100px", height: "auto", margin: "20px auto" }}
            />
          </MenuItem>
          <SubMenu title="Ventas" icon={<MonetizationOnRoundedIcon />}>
            <MenuItem icon={<SellIcon />}>
              <Link to="/home/ventas">
                <h2>Ventas</h2>
              </Link>
            </MenuItem>
            <MenuItem icon={<AssignmentReturnIcon />}>
              <Link to="/home/devolucion">
                <h2>Devolucion</h2>
              </Link>
            </MenuItem>
            <MenuItem icon={<Inventory2Icon />}>
              <Link to="/home/almacen">
                <h2>Almacen</h2>
              </Link>
            </MenuItem>
            <MenuItem icon={<LocalShippingIcon />}>
              <Link to="/home/proveedores">
                <h2>Proveedores</h2>
              </Link>
            </MenuItem>
          </SubMenu>

          <SubMenu title="Fabricacion" icon={<BarChartRoundedIcon />}>
            <MenuItem icon={<PrecisionManufacturingIcon />}>
              <Link to="/home/fabricacion">
                <h2>Tableros</h2>
              </Link>
            </MenuItem>
            <MenuItem icon={<SourceIcon />}>
              <Link to="/home/recursos">
                <h2>Recursos</h2>
              </Link>
            </MenuItem>
            <MenuItem icon={<HandymanIcon />}>
              <Link to="/home/reparacion">
                <h2>Reparacion</h2>
              </Link>
            </MenuItem>
          </SubMenu>

          <SubMenu title="Administracion" icon={<AccountBalanceRoundedIcon />}>
            <MenuItem icon={<GroupIcon />}>
              <Link to="/home/usuarios">
                <h2>Usuarios</h2>
              </Link>
            </MenuItem>
            <MenuItem icon={<EngineeringIcon />}>
              <Link to="/home/trabajadores">
                <h2>Trabajadores</h2>
              </Link>
            </MenuItem>
          </SubMenu>

          <SubMenu title="Servicio" icon={<ReceiptRoundedIcon />}>
            <MenuItem icon={<HomeRepairServiceIcon />}>
              <Link to="/home/servicios">
                <h2>Pedido</h2>
              </Link>
            </MenuItem>
            <MenuItem icon={<ElectricalServicesIcon />}>
              <Link to="/home/servicioCancelado">
                <h2>Servicio Cancelados</h2>
              </Link>
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<BubbleChartRoundedIcon />}>
            <Link to="/home/dashboard">
              <h2>Dashboard</h2>
            </Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
