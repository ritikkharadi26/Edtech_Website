import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CourseChart = ({ courses }) => {
  const [currentChart, setCurrentChart] = useState('students');

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const studentData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: 'Students Enrolled',
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const incomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: 'Income Generated',
        data: courses.map((course) => course.totalAmountGenerated),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: currentChart === 'students' ? 'Students Enrolled' : 'Income Generated',
      },
    },
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Course Statistics</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrentChart('students')}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === 'students' ? 'bg-richblack-700 text-yellow-50' : 'text-yellow-400'
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrentChart('income')}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === 'income' ? 'bg-richblack-700 text-yellow-50' : 'text-yellow-400'
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        {currentChart === 'students' ? (
          <Bar data={studentData} options={options} />
        ) : (
          <Line data={incomeData} options={options} />
        )}
      </div>
    </div>
  );
};

export default CourseChart;
