const ENDPOINT = 'http://localhost:8000';


export default function updateCita(id, camposActualizados) {
    return fetch(`${ENDPOINT}/api/citas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(camposActualizados)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Imprimir la respuesta del servidor en la consola
      return data; // Devolver los datos recibidos del servidor
    })
    .catch(error => {
      console.error('Error:', error); // Manejar el error en caso de que ocurra
      throw error;
    });
  }
  