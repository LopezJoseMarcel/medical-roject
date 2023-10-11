const BASE_URL = 'http://localhost:8000';

const createModel_info = async (model_info) => {
    try {
      const response = await fetch(`${BASE_URL}/api/model_info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model_info)
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to create model_info');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default createModel_info;