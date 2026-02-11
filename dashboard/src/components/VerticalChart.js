import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 1. Core Registration: Explicitly enabling Chart.js modules for performance optimization
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 2. Configuration Object: Defining global behavior and styling for the Bar Chart
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Holdings Distribution', // Descriptive title for portfolio analysis
    },
  },
};

/**
 * 3. Functional Visualization Component
 * @param {Object} data - Processed dataset containing stock names and values
 */
export function VerticalChart({data}) {
  // Rendering the Bar chart with specific options to ensure responsiveness
  return <Bar options={options} data={data} />;
}

export default VerticalChart;