
import React from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, GaugeController, GaugeElement } from 'chart.js';
import 'chartjs-gauge';

// Register the required components for Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  GaugeController,
  GaugeElement
);

const GaugeChart = () => {
  const data = {
    datasets: [
      {
        data: [80], // This represents the value in the gauge
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
        needleValue: 80, // Needle value
        needleColor: 'rgba(75, 192, 192, 1)', // Needle color
      },
    ],
  };

  const options = {
    type: 'gauge',
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
    circumference: Math.PI, // Semi-circle gauge
    rotation: Math.PI, // Start angle
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Gauge Chart</h2>
      <canvas id="gaugeChart"></canvas>
      <script>
        {new Chart(document.getElementById('gaugeChart').getContext('2d'), {
          type: 'gauge',
          data: data,
          options: options,
        })}
      </script>
    </div>
  );
};

export default GaugeChart;
