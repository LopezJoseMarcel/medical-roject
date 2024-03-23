import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';


const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const BarChartCiudad = ({ ciudadData }) => {
  const data = Object.entries(ciudadData.enfermedades).map(([enfermedad, cantidad]) => ({
    name: enfermedad,
    value: cantidad,
  }));

  return (
    <div>
      <h3>{ciudadData.ciudad}</h3>
      <PieChart width={400} height={300}>
        <Pie  label={({ value, percent }) => `${value} (${Math.round(percent * 100)}%)`} 
          dataKey="value" data={data} cx={200} cy={150} outerRadius={80} fill="#8884d8" >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default BarChartCiudad;
