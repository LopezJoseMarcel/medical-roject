function countInput(datos) {
    let suma = 0;
  
    // Recorre cada objeto "inputN" en los datos
    for (const key in datos) {
      if (datos.hasOwnProperty(key)) {
        const inputN = datos[key];
        if (inputN && inputN.input && Array.isArray(inputN.input)) {
          // Suma la longitud del array en la propiedad "input"
          suma += inputN.input.length;
        }
      }
    }
  
    return suma;
  }

  export default countInput;
  
  