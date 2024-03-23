import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import allCitas from '../services/allCitas';
import contarCitas from '../utils/contarCitas';
import '../styles/GraEstadoCita.css';

const GraEstadoCita = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Realiza una solicitud fetch para obtener los datos, suponiendo que tienes una URL válida
    const fetchData = async () => {
      try {
        const citasData = await allCitas();
        const countedCitas = contarCitas(citasData);
        // Asigna colores a las barras
        const dataWithColors = countedCitas.map((item, index) => ({
          ...item,
          fill: index === 0 ? '#8884d8' : '#82ca9d', // Define colores personalizados
        }));
        setData(dataWithColors);
      } catch (error) {
        console.error('Error en la solicitud fetch:', error);
      }
    };

    fetchData();
  }, []); // Asegúrate de ajustar las dependencias de useEffect según tus necesidades

  return (
    <div>
      <label>Citas</label>
        <div id='grafico-cita'>

        <LineChart width={600} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={(entry) => `${entry.año} ${entry.mes.substring(0, 3)}`} tick={{ fontSize: 10 }} padding={{ left: 30, right: 30 }} />
          <YAxis label={{ value: 'Cantidad', angle: -90, position: 'insideLeft' }} allowDecimals={false}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="asistidas" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="incumplidas" stroke="#82ca9d" />
        </LineChart>

        
      </div>
    </div>

    
  );
};

export default GraEstadoCita;
