
import createModel_info from "../services/createModel_info";




/*
const guardarModelInfo = async (numero_diccionario,input,output) => {
    const objetoResponse = await get_model_info(numero_diccionario)
        .then(
            data => {
                const objeto = data;
                asignarElementos(output,objeto,input);

                update_Model_Info(numero_diccionario, objeto)
            }
        )
        .catch(err => console.log(err))
}*/

const guardarModelInfo = async (numero_diccionario, input, output) => {
    try {
      const objeto = {
        "numero_diccionario": numero_diccionario,
        "input": input,
        "output1": output,
      };
      

      await createModel_info(objeto);
    } catch (error) {
      console.error(error);
    }
  }; 

export default guardarModelInfo;