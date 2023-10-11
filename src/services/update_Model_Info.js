const ENDPOINT = 'http://localhost:8000';


export default function update_Model_Info(numero_diccionario, camposActualizados) {
    return fetch(`${ENDPOINT}/api/model_info?numero_diccionario=${numero_diccionario}`, {
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
  