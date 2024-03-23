const ENDPOINT = 'http://localhost:8000';


export default function registerService({ nombre, apellido, email, contrasenha }) {
  return fetch(`${ENDPOINT}/api/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, apellido, email, contrasenha,
    rol: "paciente", historial_tratamientos: [],
    historial_enfermedades:[]
    }),
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parsea la respuesta JSON
      } else if (response.status === 409) {
        return { error: "El usuario ya existe" };
      } else {
        return { error: 'Failed to register user' };
      }
    })
    .then(data => {
      return data; // Devuelve los datos de la respuesta (incluido el campo 'error')
    });
}
