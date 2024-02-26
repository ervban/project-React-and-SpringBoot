import React, { useState } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import NavBarSup from "./NavBarSup";


function Home() {
  const [currentComponent, setCurrentComponent] = useState("Home");

  return (
    <div className="flex">
      <NavBar />
      <div className="flex-1 overflow-hidden bg-gray-200">
        <div>
          <NavBarSup currentComponent={currentComponent} />
        </div>
        <div className="p-4 flex-1">
          <Outlet setCurrentComponent={setCurrentComponent} />
          <div className="p-4 flex">
            {/* Contenido adicional del componente Home */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
