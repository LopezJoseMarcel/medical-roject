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
import { format } from "date-fns";

const AppointmentPage = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [nextCitas, setNextCitas] = useState([]);
  const [citasDelDia, setCitasDelDia] = useState([]);
  const { userInfo } = useContext(Context);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
  };

  const handleCrearCita = useCallback(async (horario) => {
    if (fechaSeleccionada && horario) {
      try {
        const citaData = {
          usuario_id: userInfo._id,
          fecha: format(fechaSeleccionada, "yyyy-MM-dd"),
          turno: horario,
          full_name: userInfo.nombre + " " + userInfo.apellido
        };

        const nuevaCita = await createCita(citaData);
        console.log('Cita creada:', nuevaCita);

        // Restablecer selecciones después de crear la cita
        setFechaSeleccionada(null);
        setHorariosDisponibles([]); // Puedes reiniciar los horarios disponibles si es necesario
      } catch (error) {
        console.error('Error al crear la cita:', error.message);
      }
    } else {
      console.error('Debes seleccionar una fecha y un horario antes de crear la cita.');
    }
  }, [fechaSeleccionada, userInfo._id]);

  const handleVolverAtras = () => {
    setFechaSeleccionada(null);
    setHorarioSeleccionado(null);
  };

  const handleFechaSeleccionada = (fecha) => {
    setFechaSeleccionada(fecha);
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
            const citaSeleccionada = format(new Date(fechaSeleccionada), "yyyy-MM-dd");
            return cita.fecha === citaSeleccionada;
          });
  
          const horariosOcupados = citasFiltradas.map(cita => cita.turno);
          const horariosDisponibles = ['15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00'];
  
          // Filtra los horarios disponibles
          const horariosDisponiblesFiltrados = horariosDisponibles.filter(horario => !horariosOcupados.includes(horario));
  
          setCitasDelDia(citasFiltradas);
          setHorariosDisponibles(horariosDisponiblesFiltrados);
        } catch (error) {
          console.error('Error al cargar las citas del día:', error.message);
        }
      } else {
        setCitasDelDia([]);
        setHorariosDisponibles([]);
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
              horariosDisponibles={horariosDisponibles}
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
