
function contarCitas(citas) {
  const resultado = citas.reduce((acumulador, cita) => {
    const fecha = new Date(cita.fecha);
    const mes = fecha.toLocaleString('default', { month: 'long' });
    const año = fecha.getFullYear();
    const clave = `${mes} ${año}`;

    if (!acumulador[clave]) {
      acumulador[clave] = {
        incumplidas: 0,
        asistidas: 0,
        mes,
        año: año.toString(),
      };
    }

    if (cita.estado === 'asistida') {
      acumulador[clave].asistidas++;
    } else {
      acumulador[clave].incumplidas++;
    }

    return acumulador;
  }, {});

  const resultadoOrdenado = Object.values(resultado).sort((a, b) => {
    // Ordenar primero por año, luego por mes
    if (a.año !== b.año) {
      return a.año - b.año;
    }
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return meses.indexOf(a.mes) - meses.indexOf(b.mes);
  });

  return resultadoOrdenado;
}



export default contarCitas;