const BASE_URL = 'http://localhost:8000';

const fetchNextCitas = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/citas-next/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch next citas');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchNextCitas;
