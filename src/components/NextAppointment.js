import React from "react";
import '../styles/NextAppointment.css'

const fechaISO8601 = "2023-06-08T04:00:00.000Z";
const fecha = new Date(fechaISO8601);
const diaSemana = fecha.toLocaleDateString("es-ES", { weekday: "long" });

console.log(diaSemana); // Output: "jueves"

const InsertEnfermedad = ({ citas }) => {
  return (
    <div id="next-appointment" className="next-appointment">
      <h4>Próximas citas:</h4>
      {citas.length > 0 ? (
        citas.map((cita) => (
          <div className="appointment-info" key={cita._id}>
            <span>{cita.fecha.slice(0, cita.fecha.indexOf("T"))}</span> <span>{cita.turno + " "}</span> <span>{new Date(cita.fecha).toLocaleDateString("es-ES", { weekday: "long" })}</span> 
          </div>
        ))
      ) : (
        <p>No hay próximas citas.</p>
      )}
    </div>
  );
}

export default InsertEnfermedad;


