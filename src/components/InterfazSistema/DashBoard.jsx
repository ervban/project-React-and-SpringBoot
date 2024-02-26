import React from "react";
import BarChart from "../Graficas/BarChart";
import PieChart from "../Graficas/BarChartChart";
import ScatterChart from "../Graficas/ScatterChart";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="p-4 flex justify-center items-center">
        <div className="mr-4">
          <div className="mt-4 pt-14" style={{ width: "400px", height: "300px", background: "white"}}>
            <BarChart />
          </div>
        </div>
        <div className="ml-4">
          <div className="mt-4" style={{ width: "400px", height: "300px", background: "white" }}>
            <PieChart />
          </div>
        </div>
      </div>

      <div className="p-4 flex justify-center items-center">
        <div className="mr-4">
          <div className="mt-4" style={{ width: "800px", height: "400px", background: "white" }}>
            <ScatterChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
