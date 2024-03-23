import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import contarEnfermedadCitasMes from '../utils/contarEnfermedadCitasMes';

const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const GraEnferMes = () => {
  const [series, setSeries] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const enfermedadesData = await contarEnfermedadCitasMes();
      setSeries(enfermedadesData);
      console.log(enfermedadesData);
    };

    fetchData();
  }, []);

  return (series &&
    <ResponsiveContainer width="100%" height={400}>
       <LineChart width={500} height={300}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="category"
        type="category"
        allowDuplicatedCategory={false}
      />
      <YAxis dataKey="value"  label={{ value: 'Cantidad', angle: -90, position: 'insideLeft' }}/>
      <Tooltip />
      <Legend />
      {series.map((s) => (
        <Line
          dataKey="value"
          data={s.data}
          name={s.name}
          key={s.name}
          stroke={generateRandomColor()} // Asigna un color aleatorio a cada línea
        />
      ))}
    </LineChart>
    </ResponsiveContainer>
  );
};

export default GraEnferMes;
