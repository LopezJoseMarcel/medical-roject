const BASE_URL = 'http://localhost:8000'; // Reemplaza con la URL correcta de tu API

const diseasesService = async (enfermedadId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/enfermedades/${enfermedadId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch enfermedades');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  
};
export default diseasesService


