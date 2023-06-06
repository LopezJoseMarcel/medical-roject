const ENDPOINT = 'http://localhost:8000'; // Reemplaza con la URL correcta de tu API

const getProfile = async (jwt) => {
  try {
    const response = await fetch(`${ENDPOINT}/api/profile`, {
      headers: {
        Authorization: jwt,
      },
    });

    if (response.ok) {
      const profile = await response.json();
      return profile;
    } else {
      throw new Error('Failed to fetch user profile');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getProfile;
