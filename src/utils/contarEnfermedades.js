import allEnferService from "../services/allEnferService";
import getAllConsultaCita from "../services/getAllConsultaCita";

// Función para obtener un mapeo de IDs a nombres de enfermedades
async function obtenerMapeoEnfermedades() {
  const enfermedades = await allEnferService();
  const mapeo = {};

  enfermedades.forEach((enfermedad) => {
    const id = String(enfermedad._id); // Convierte el _id a cadena
    mapeo[id] = enfermedad.nombre;
  });

  console.log("Mapeo");
  console.log(mapeo);

  return mapeo;
}


// Función para contar enfermedades y reemplazar IDs con nombres
async function contarEnfermedades() {
  const arr = await getAllConsultaCita();
  const enfermedades = await obtenerMapeoEnfermedades();

  const resultado = {};

  arr.forEach((item) => {
    item.diagnostico.diagnostico_final.forEach((id) => {
      const nombreEnfermedad = enfermedades[id] || "Desconocida";
      if (resultado[nombreEnfermedad]) {
        resultado[nombreEnfermedad]++;
      } else {
        resultado[nombreEnfermedad] = 1;
      }
    });

    item.diagnostico.diagnostico_presuntivo.forEach((id) => {
      const nombreEnfermedad = enfermedades[id] || "Desconocida";
      if (resultado[nombreEnfermedad]) {
        resultado[nombreEnfermedad]++;
      } else {
        resultado[nombreEnfermedad] = 1;
      }
    });
  });

  // Convertir el objeto a un array de objetos con nombre y cantidad
  const resultadoFinal = Object.keys(resultado).map((nombre) => ({
    name: nombre,
    cantidad: resultado[nombre],
  }));
  console.log("resultadoFinal")
  console.log(resultadoFinal)
  return resultadoFinal;
}

export default contarEnfermedades;
