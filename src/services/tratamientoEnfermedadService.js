const BASE_URL = 'http://localhost:8000'; // Reemplaza con la URL correcta de tu API

const tratamientoEnfermedadService = async (tratamientoID) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tratamiento-disease/${tratamientoID}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch enfermedades');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  
};
export default tratamientoEnfermedadService


