const BASE_URL = 'http://localhost:8000'; // Reemplaza con la URL correcta de tu API

const get_model_info= async (numero_diccionario) => {
  try {
    const response = await fetch(`${BASE_URL}/api/model_info?numero_diccionario=${numero_diccionario}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch citas');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default get_model_info;