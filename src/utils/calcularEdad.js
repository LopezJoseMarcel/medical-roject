function calcularEdad(fechaNacimiento) {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    
    const edad = fechaActual.getFullYear() - fechaNac.getFullYear();
  
    // Verificar si aún no ha cumplido años en este año
    if (
      fechaNac.getMonth() > fechaActual.getMonth() ||
      (fechaNac.getMonth() === fechaActual.getMonth() && fechaNac.getDate() > fechaActual.getDate())
    ) {
      return edad - 1;
    }
  
    return edad;
  }
  
  const fechaNacimiento = '2000-01-11'; // Cambia esto por la fecha de nacimiento en formato 'YYYY-MM-DD'
  const edad = calcularEdad(fechaNacimiento);
  console.log(`La edad es ${edad} años.`);

  export default calcularEdad;