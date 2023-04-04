import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/DiseaseTreatment.css'

function createData(id, wayUse,medicine, filing, amount, dailyFrequency, daysTreatment) {
  return { id, wayUse, medicine,filing, amount, dailyFrequency, daysTreatment };
}

const rows = [
  createData(1 ,'Ingerir', 'Fluconazol', 'comprimido', 2, 6, 7),
  createData(2 ,'Aplicar', 'Miconazol', 'crema', 1, 6, 7) 
];

export default function DiseaseTreatment() {
  return (
    <TableContainer className='table' component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Forma de aplicación</TableCell>
            <TableCell align="right">Medicamento</TableCell>
            <TableCell align="right">Presentación&nbsp;(g)</TableCell>
            <TableCell align="right">Cantidad &nbsp;(n)</TableCell>
            <TableCell align="right">Frecuencia diaria&nbsp;(hs)</TableCell>
            <TableCell align="right">Tiempo de tratamiento&nbsp;(dias)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.wayUse}</TableCell>
              <TableCell align="right">{row.medicine}</TableCell>
              <TableCell align="right">{row.filing}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.dailyFrequency}</TableCell>
              <TableCell align="right">{row.daysTreatment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}