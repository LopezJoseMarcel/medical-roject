const BASE_URL = 'http://localhost:8000';

const createConsultaService = async (consultaData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/consultas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(consultaData)
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to create consulta');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default createConsultaService;