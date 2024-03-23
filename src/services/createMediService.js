const BASE_URL = 'http://localhost:8000';

const createMediService = async (mediData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/medicamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mediData)
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to create medicamento');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default createMediService;