import React from "react";
import '../styles/NextAppointment.css'


const InsertEnfermedad = ({ citas }) => {
  return (
    <div id="next-appointment" className="next-appointment">
      <h4>Próximas citas:</h4>
      {citas.length > 0 ? (
        citas.map((cita) => (
          <div className="appointment-info" key={cita._id}>
            <span>{cita.fecha}</span> <span>{cita.turno + " "}</span> <span>{new Date(cita.fecha).toLocaleDateString("es-ES", { weekday: "long" })}</span> 
          </div>
        ))
      ) : (
        <p>No hay próximas citas.</p>
      )}
    </div>
  );
}

export default InsertEnfermedad;


