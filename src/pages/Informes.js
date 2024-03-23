import React from "react";
import GraEstadoCita from '../components/GraEstadoCita';
import GraConsultas from "../components/GraConsultas";
import GraConsultaEnfermedad from "../components/GraConsultaEnfermedad";
import GraEnferCiudad from "../components/GraEnferCiudad";
import GraEnferMes from "../components/GraEnferMes";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import '../styles/Informes.css';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Informes() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'white', }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Citas" {...a11yProps(0)} />
          <Tab label="Consultas por enfermedad" {...a11yProps(1)} />
          <Tab label="Consultas por mes/año" {...a11yProps(2)} />
          <Tab label="Enfermedades por ciudad" {...a11yProps(3)} />
          <Tab label="Enfermedades por período de tiempo " {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GraEstadoCita/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
         <GraConsultaEnfermedad/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GraConsultas/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GraEnferCiudad/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GraEnferMes/>
      </CustomTabPanel>
    </Box>
  );
}

