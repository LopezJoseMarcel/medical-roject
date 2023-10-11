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
    <div id='full-container'>
      <h3 className='table-title'>Tratamiento Activo</h3>
      <TableContainer className='table' component={Paper}>
        <Table sx={{ minWidth: 600}} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              
              <TableCell id='table-rows'  align="left">Forma de aplicación</TableCell>
              <TableCell id='table-rows' align="left">Medicamento</TableCell>
              <TableCell id='table-rows' align="left">Presentación&nbsp;(g)</TableCell>
              <TableCell id='table-rows' align="left">Cantidad &nbsp;(n)</TableCell>
              <TableCell id='table-rows' align="left">Frecuencia diaria&nbsp;(hs)</TableCell>
              <TableCell id='table-rows' align="left">Tiempo de tratamiento&nbsp;(dias)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tratamientos.map((tratamiento) =>
              tratamiento.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell id='table-rows' align="left">{row.medicamento_info[0].administracion[0]}</TableCell>
                  <TableCell id='table-rows' align="left">{row.medicamento_info[0].nombre}</TableCell>
                  <TableCell id='table-rows' align="left">{row.medicamento_info[0].presentacion}</TableCell>
                  <TableCell id='table-rows' align="left">{row.cantidad_uso.cantidad}</TableCell>
                  <TableCell id='table-rows' align="left">{row.frecuencia_diaria_hr}</TableCell>
                  <TableCell id='table-rows' align="left">{`${row.tratamiento_tiempo.fecha_inicio} - ${row.tratamiento_tiempo.fecha_fin}`}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
