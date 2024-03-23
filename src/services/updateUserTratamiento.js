const ENDPOINT = 'http://localhost:8000';


export default function updateUserTratamiento(id, camposActualizados) {
    return fetch(`${ENDPOINT}/api/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(camposActualizados)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
  }
  