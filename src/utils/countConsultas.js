function countConsultas(consultas) {
    // Crear un objeto para mantener el seguimiento de los conteos
    const conteoPorFecha = {};
  
    // Iterar a través de las consultas
    consultas.forEach(consulta => {
      const fechaCita = new Date(consulta.cita.fecha);
      const year = fechaCita.getFullYear();
      const month = fechaCita.toLocaleString('default', { month: 'long' }); // Obtener el nombre del mes
  
      // Construir la clave para el objeto de conteo
      const clave = `${year}-${month}`;
  
      // Incrementar el contador correspondiente
      if (conteoPorFecha[clave]) {
        conteoPorFecha[clave].cantidad++;
      } else {
        conteoPorFecha[clave] = { año: year, mes: month, cantidad: 1 };
      }
    });
  
    // Convertir el objeto en un array de resultados
    const resultados = Object.values(conteoPorFecha);
  
    return resultados;
  }
  
  
  export default countConsultas;
 