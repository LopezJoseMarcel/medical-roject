import React, { useEffect, useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/DiseaseTreatment.css';
import tratamientoEnfermedadService from '../services/tratamientoEnfermedadService';
import Context from '../context/UserContext';

export default function DiseaseTreatment() {
  const [tratamientos, setTratamientos] = useState([]);
  const { userInfo } = useContext(Context);

  useEffect(() => {
    const fetchTratamientos = async () => {
      try {
        // Obtener tratamientos desde el servicio
        const promises = userInfo.tratamiento.map((id) => tratamientoEnfermedadService(id));
        const data = await Promise.all(promises);
        setTratamientos(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTratamientos();
  }, []);

  return (
    <div className='full-container'>
      <h3 className='table-title'>Tratamiento Activo</h3>
      <TableContainer className='table' component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              
              <TableCell align="right">Forma de aplicación</TableCell>
              <TableCell align="right">Medicamento</TableCell>
              <TableCell align="right">Presentación&nbsp;(g)</TableCell>
              <TableCell align="right">Cantidad &nbsp;(n)</TableCell>
              <TableCell align="right">Frecuencia diaria&nbsp;(hs)</TableCell>
              <TableCell align="right">Tiempo de tratamiento&nbsp;(dias)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tratamientos.map((tratamiento) =>
              tratamiento.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell align="right">{row.medicamento_info[0].administracion[0]}</TableCell>
                  <TableCell align="right">{row.medicamento_info[0].nombre}</TableCell>
                  <TableCell align="right">{row.medicamento_info[0].presentacion}</TableCell>
                  <TableCell align="right">{row.cantidad_uso.cantidad}</TableCell>
                  <TableCell align="right">{row.frecuencia_diaria_hr}</TableCell>
                  <TableCell align="right">{`${row.tratamiento_tiempo.fecha_inicio} - ${row.tratamiento_tiempo.fecha_fin}`}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
