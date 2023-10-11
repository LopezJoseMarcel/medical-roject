const BASE_URL = 'http://localhost:8000';

const medicalModelService = async (enfermedad, outputs, inputData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/prediccion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({enfermedad, outputs, inputData})
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Fallo la prediccion');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default medicalModelService;