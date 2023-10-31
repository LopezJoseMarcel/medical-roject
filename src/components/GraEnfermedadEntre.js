import React, { useState, useEffect } from 'react';
import allConsultaUsuario from '../services/allConsultaUsuario';
import contarEnferCiudad from '../utils/contarEnferCiudad';
import BarChartCiudad from './BarChartCiudad';
import '../styles/GraEnfermedadEntre.css'

const GraEnfermedadEntre = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const citasData = await allConsultaUsuario(); // Reemplaza esto con tu función para obtener los datos
        const countedEnfermedadesPorCiudad = await contarEnferCiudad(citasData);
        setData(countedEnfermedadesPorCiudad);

      } catch (error) {

        console.error('Error en la solicitud fetch:', error);

      }
    };

    fetchData();
  }, []); // Asegúrate de ajustar las dependencias de useEffect según tus necesidades

  return (
    <div>
      <label>Enfermedades por Ciudad</label>
      <div id="graficos-barras">
        {data.map((ciudadData, index) => (
          <BarChartCiudad key={index} ciudadData={ciudadData} />
        ))}
      </div>
    </div>
  );
};

export default GraEnfermedadEntre;
