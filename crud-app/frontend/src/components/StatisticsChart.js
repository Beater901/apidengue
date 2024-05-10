import React from 'react';
import { Bar } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);


function StatisticsChart({ data }) {
  return (
    <div>
      <h2>Estadísticas por Dirección</h2>
      <Bar data={data} />
    </div>
  );
}

export default StatisticsChart;
