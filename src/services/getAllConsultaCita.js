const BASE_URL = 'http://localhost:8000'; // Reemplaza con la URL correcta de tu API

const getAllConsultaCita= async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/consultas_citas`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch Consulta Citas');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getAllConsultaCita;