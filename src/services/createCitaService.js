const BASE_URL = 'http://localhost:8000';

const createCita = async (citaData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(citaData)
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
  
  export default createCita;