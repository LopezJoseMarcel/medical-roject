const BASE_URL = 'http://localhost:8000'; // Reemplaza con la URL correcta de tu API

const trainModel = async (numero_diccionario) => {
  try {
    const response = await fetch(`${BASE_URL}/api/trainDisease?numero_diccionario=${numero_diccionario}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch object-disease');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default trainModel;