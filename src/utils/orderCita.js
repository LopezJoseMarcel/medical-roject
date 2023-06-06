
const obtenerCitaMasReciente = (citas) => {
    if (citas.length === 0) {
      return null; // Si el array de citas está vacío, devuelve null o algún valor predeterminado según tus necesidades
    }
    
    // Ordena las citas por fecha en orden descendente
    citas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    return citas[0]; // Devuelve la primera cita que será la más reciente
  };
  
export default obtenerCitaMasReciente;
