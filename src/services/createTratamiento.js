const BASE_URL = 'http://localhost:8000';

const createTratamiento = async (tratamientoData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tratamientos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tratamientoData)
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to create cita');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default createTratamiento;