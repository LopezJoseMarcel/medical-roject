// 
import React, { useEffect, useState, useContext, useCallback } from "react";
import '../styles/AppointmentPage.css';
import NextAppointment from "../components/NextAppointment";
import Calendar from "../components/Calendar";
import Appointment from "../components/Appointment";
import AppointmentHistory from "../components/AppointmentHistory";
import Context from '../context/UserContext';
import createCita from "../services/createCitaService";
import fetchNextCitas from "../services/nextCitas";
import allCitas from "../services/allCitas";

const AppointmentPage = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [nextCitas, setNextCitas] = useState([]);
  const [citasDelDia, setCitasDelDia] = useState([]);
  const { userInfo } = useContext(Context);

  const handleFechaSeleccionada = (fecha) => {
    setFechaSeleccionada(fecha);
  };

  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCrearCita = useCallback(async () => {
    if (fechaSeleccionada && horarioSeleccionado) {
      try {
        const citaData = {
          usuario_id: userInfo._id,
          fecha: fechaSeleccionada,
          turno: horarioSeleccionado,
          full_name: userInfo.nombre + " " + userInfo.apellido
        };

        const nuevaCita = await createCita(citaData);
        console.log('Cita creada:', nuevaCita);
      } catch (error) {
        console.error('Error al crear la cita:', error.message);
      }
    } else {
      console.error('Debes seleccionar una fecha y un horario antes de crear la cita.');
    }
  }, [fechaSeleccionada, horarioSeleccionado, userInfo._id]);

  const handleVolverAtras = () => {
    setFechaSeleccionada(null);
    setHorarioSeleccionado(null);
  };

  useEffect(() => {
    const fetchNextCitasData = async () => {
      try {
        const citas = await fetchNextCitas(userInfo._id);
        setNextCitas(citas);
      } catch (error) {
        console.error('Error al cargar las próximas citas:', error.message);
      }
    };

    fetchNextCitasData();
  }, [userInfo._id, handleCrearCita]);

  useEffect(() => {
    const fetchCitasDelDia = async () => {
      if (fechaSeleccionada) {
        try {
          const citas = await allCitas();
          const citasFiltradas = citas.filter((cita) => {
            // Filtrar por el día seleccionado en el calendario
            const citaFecha = new Date(cita.fecha);
            return citaFecha.toDateString() === fechaSeleccionada.toDateString();
          });
          setCitasDelDia(citasFiltradas);
        } catch (error) {
          console.error('Error al cargar las citas del día:', error.message);
        }
      } else {
        setCitasDelDia([]);
      }
    };

    fetchCitasDelDia();
  }, [fechaSeleccionada]);

  return (
    <div className="main-container">
      <div className="first-column">
        <NextAppointment citas={nextCitas} />
        <h3 id="selection-title" className="selection-title">Seleccione un horario para una cita</h3>
        <div>
          {fechaSeleccionada ? (
            <Appointment
              fechaSeleccionada={fechaSeleccionada}
              horarioSeleccionado={horarioSeleccionado}
              horariosOcupados={citasDelDia.map(cita => cita.turno)}
              onHorarioSeleccionado={handleHorarioSeleccionado}
              onCrearCita={handleCrearCita}
              onVolverAtras={handleVolverAtras}
            />
          ) : (
            <Calendar onFechaSeleccionada={handleFechaSeleccionada} />
          )}
        </div>
      </div>
      <div>
        <h3 id="selection-title">Historial de Citas</h3>
        <AppointmentHistory />
      </div>
    </div>
  );
}

export default AppointmentPage;
