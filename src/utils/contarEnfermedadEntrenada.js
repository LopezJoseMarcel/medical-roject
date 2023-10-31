function contarEnfermedadEntrenada(enfermedades) {
    let enfermedadesEntrenadas = 0;
    let enfermedadesNoEntrenadas = 0;
  
    enfermedades.forEach((enfermedad) => {
      if (enfermedad.enfermedad_entrenada) {
        enfermedadesEntrenadas++;
      } else {
        enfermedadesNoEntrenadas++;
      }
    });
  
    const resultado = [
      {
        name: "entrenada",
        cantidad: enfermedadesEntrenadas,
      },
      {
        name: "sin entrenar",
        cantidad: enfermedadesNoEntrenadas,
      },
    ];
  
    return resultado;
  }
  
  export default contarEnfermedadEntrenada;