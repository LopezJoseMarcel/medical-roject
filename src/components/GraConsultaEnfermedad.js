import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell} from "recharts";
import contarEnfermedades from "../utils/contarEnfermedades";
import '../styles/GraConsultaEnfermedad.css';

const GraConsultaEnfermedad = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const enfermedadesData = await contarEnfermedades();
      setData(enfermedadesData);
    };

    fetchData();
  }, []);

  // Función para generar colores aleatorios
  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div>
      <label> Cantidad de Consultas por Enfermedad</label>
      <div id='consulta-enfermedad'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="cantidad"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ cantidad, percent }) => `${cantidad} (${Math.round(percent * 100)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={generateRandomColor()} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default GraConsultaEnfermedad;
