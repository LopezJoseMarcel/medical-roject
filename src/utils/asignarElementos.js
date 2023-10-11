function asignarElementos(arrayDeArrays, objeto, inputP) {
    
    objeto.input = objeto.input.concat([inputP]) ;

    for (let i = 0; i < arrayDeArrays.length; i++) {
      const subarray = arrayDeArrays[i];
      const numero = subarray[0];
  
      let asignado = false;
      for (let j = 1; j <= 6; j++) {
        const outputKey = `output${j}`;
        const primerOutput = objeto[outputKey][0];
  
        if (primerOutput && primerOutput[0] === numero) {
          // El número ya está en el primer output, agregamos el subarray completo
          objeto[outputKey].push(subarray);
          asignado = true;
          break;
        }
      }
  
      if (!asignado) {
        // Si el número no se encontró en ningún output existente, lo agregamos al primer output vacío
        for (let j = 1; j <= 6; j++) {
          const outputKey = `output${j}`;
          if (objeto[outputKey].length === 0) {
            objeto[outputKey].push(subarray);
            asignado = true;
            break;
          }
        }
      }
    }
  }
  /*
  const objeto = {
    numero_diccionario: 1,
    input:[],
    output1: [],
    output2: [],
    output3: [[2, 2, 6, 5, 8]],
    output4: [],
    output5: [],
    output6: [],
  };
  
  const arrayDeArrays = [
    [2, 5, 6, 7, 8],
    [5, 3, 6, 8, 1],
    [7, 3, 6, 7, 1],
    [1, 4, 2, 7, 2],
    [2, 5, 6, 7, 8]
  ];
  
  asignarElementos(arrayDeArrays, objeto, [2,5,7,9,4]);
  
  console.log(objeto);*/
  
 export default asignarElementos;