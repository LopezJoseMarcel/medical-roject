const BASE_URL = 'http://localhost:8000'; // Reemplaza con la URL correcta de tu API

const consultaService = async (usuarioId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/citas/usuario/${usuarioId}`);
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
export default consultaService


