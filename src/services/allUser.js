const BASE_URL = 'http://localhost:8000';

const allCitas = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/usuarios`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch usuarios');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default allCitas;