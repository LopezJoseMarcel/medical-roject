import allEnferService from "../services/allEnferService";

async function contarEnferCiudad(data) {
  const enfermedades = await allEnferService();

  // Crear un mapeo de IDs de enfermedades a sus nombres
  const enfermedadesMapeo = {};
  enfermedades.forEach((enfermedad) => {
    enfermedadesMapeo[enfermedad._id] = enfermedad.nombre;
  });

  const enfermedadesPorCiudad = {};

  data.forEach((item) => {
    const ciudad = item.usuario.direccion.ciudad;
    const diagnosticos = [
      ...item.diagnostico.diagnostico_final,
      ...item.diagnostico.diagnostico_presuntivo,
    ];

    if (!enfermedadesPorCiudad[ciudad]) {
      enfermedadesPorCiudad[ciudad] = {};
    }

    diagnosticos.forEach((diagnostico) => {
      const nombreEnfermedad = enfermedadesMapeo[diagnostico] || 'Desconocida';

      if (!enfermedadesPorCiudad[ciudad][nombreEnfermedad]) {
        enfermedadesPorCiudad[ciudad][nombreEnfermedad] = 1;
      } else {
        enfermedadesPorCiudad[ciudad][nombreEnfermedad]++;
      }
    });
  });

  const result = Object.keys(enfermedadesPorCiudad).map((ciudad) => ({
    ciudad,
    enfermedades: enfermedadesPorCiudad[ciudad],
  }));

  console.log("Contar Enfer Ciudad:");
  console.log(result);

  return result;
}

export default contarEnferCiudad;
