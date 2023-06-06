const ENDPOINT = 'http://localhost:8000';

export default function registerService({email,genero,cedula,fecha_nacimento, calle, barrio, ciudad, movil}) {
  return fetch(`${ENDPOINT}/api/usuarios?email=${email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({genero,cedula,fecha_nacimento,movil,
        direccion:{calle, barrio, ciudad} }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update user');
      }
    })
    .catch(error => {
      throw new Error(error.message);
    });
}
