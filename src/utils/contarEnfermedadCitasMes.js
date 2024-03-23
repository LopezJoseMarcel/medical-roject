import allEnferService from "../services/allEnferService";
import getAllConsultaCita from "../services/getAllConsultaCita";

async function obtenerMapeoEnfermedades() {
  const enfermedades = await allEnferService();
  const mapeo = {};

  enfermedades.forEach((enfermedad) => {
    mapeo[enfermedad._id] = enfermedad.nombre; // Usar _id como clave y nombre como valor
  });

  return mapeo;
}

async function contarEnfermedadesPorMesYAnio() {
  const data = await getAllConsultaCita();
  const mapeoEnfermedades = await obtenerMapeoEnfermedades();

  const enfermedadesPorMesYAnio = {};

  // Encontrar la fecha más temprana y la fecha más reciente
  let fechaInicial = new Date();
  let fechaFinal = new Date();

  data.forEach((consulta) => {
    const fecha = new Date(consulta.cita.fecha);
    fechaInicial = fecha < fechaInicial ? fecha : fechaInicial;
    fechaFinal = fecha > fechaFinal ? fecha : fechaFinal;
  });

  // Crear un arreglo con los meses entre la fechaInicial y fechaFinal
  const mesesEntreFechas = [];
  let fechaActual = new Date(fechaInicial);

  while (fechaActual <= fechaFinal) {
    mesesEntreFechas.push({
      mes: fechaActual.toLocaleString('es-ES', { month: 'short' }),
      anio: fechaActual.getFullYear(),
    });

    fechaActual.setMonth(fechaActual.getMonth() + 1);
  }

  // Inicializar los datos
  const datosPorEnfermedad = {};

  data.forEach((consulta) => {
    const fecha = new Date(consulta.cita.fecha);
    const mes = fecha.toLocaleString('es-ES', { month: 'short' });
    const anio = fecha.getFullYear();

    const diagnosticos = consulta.diagnostico.diagnostico_final.concat(consulta.diagnostico.diagnostico_presuntivo);

    diagnosticos.forEach((diagnostico) => {
      const nombreEnfermedad = mapeoEnfermedades[diagnostico] || "Desconocida";
      if (!datosPorEnfermedad[nombreEnfermedad]) {
        datosPorEnfermedad[nombreEnfermedad] = {};
      }

      const clave = `${mes} ${anio}`;
      if (!datosPorEnfermedad[nombreEnfermedad][clave]) {
        datosPorEnfermedad[nombreEnfermedad][clave] = 1;
      } else {
        datosPorEnfermedad[nombreEnfermedad][clave]++;
      }
    });
  });

  // Crear el resultado en el formato deseado
  const series = [];

  Object.keys(datosPorEnfermedad).forEach((nombreEnfermedad) => {
    const dataEnfermedad = mesesEntreFechas.map(({ mes, anio }) => {
      const clave = `${mes} ${anio}`;
      return {
        category: `${mes} ${anio}`,
        value: datosPorEnfermedad[nombreEnfermedad][clave] || 0,
      };
    });

    series.push({
      name: nombreEnfermedad,
      data: dataEnfermedad,
    });
  });

  return series;
}

export default contarEnfermedadesPorMesYAnio;
