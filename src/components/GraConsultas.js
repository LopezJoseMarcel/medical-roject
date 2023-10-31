import React, { useState, useEffect } from 'react';
import getAllConsultaCita from '../services/getAllConsultaCita';
import { BarChart, Bar, XAxis, YAxis,Tooltip } from 'recharts';
import countConsultas from '../utils/countConsultas';
import '../styles/GraConsultas.css'

export default function GraConsultas() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAllConsultaCita()
      .then((response) => {
        const data = countConsultas(response);

        setData(data);
      })
      .catch((error) => {
        console.error('Error en la solicitud fetch:', error);
      });
  }, []);

  return (
    <div>
      <label>Consultas</label>
      <div id='grafico-consulta'>
      
        {data && (
          <BarChart width={500} height={250} data={data}>
            <XAxis dataKey={(entry) => `${entry.año} ${entry.mes}`} 
            tick={{ fontSize: 10 }}/>
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        )}
      </div>
    </div>
    
  );
}
