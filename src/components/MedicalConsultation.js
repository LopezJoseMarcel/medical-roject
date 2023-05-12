import React from "react";
import { useState } from "react";
import '../styles/MedicalConsultation.css';

const MedicalConsultation = () => {
    return(
        <div className="clinic-container">

                <div className="Consulta-cabecera">
                <h2>Consulta Médica</h2>
                <h3>Jose Marcel Lopez</h3>
                <div className="">
                    <label for="motivo">Motivo de consulta:</label>
                    <input id="motivo" className="motivo" type="text"/>
                    <button className="boton-cabecera" >ver mas información del paciente</button>
                </div>
                
                
                </div>
        
                <div className="examen-fisico-container">
                <h3>Examen Físico</h3>
                <h4>Piel, Faneras y Tejidos Celular Subcutáneo</h4>
                <div className="skin-container">
                    <h4>a. Piel:</h4>
                    <label for="skin-color">Color:</label>
                    <input id="skin-color" className="skin-color" type="text"/>
                    <label for="turgencia">Turgencia:</label>
                    <input id="turgencia" className="turgencia" type="text"/>
                    <label for="masculasPvPcH">Máculas/Pápulas/Vesículas/Pústulas/Costras/Habón:</label>
                    <input id="masculasPvPcH" className="masculasPvPcH" type="text"/>
                </div>
                <div className="faneras-container">
                    <h4>b. Faneras:</h4>
                    <label for="pelo">Pelo:</label>
                    <input id="pelo" className="pelo" type="text"/>
                    <label for="unhas">Uñas:</label>
                    <input id="unhas" className="unhas" type="text"/>
                </div>
                <div className="tejidoCelularSc-container">
                    <h4>c. Tejidos:</h4>
                    <label for="tcs">Tejido celular subcutáneo:</label>
                    <input id="tcs" className="tcs" type="text"/>
                    
                </div>
        
                </div>
        
                <div className="diagnostico-container">
                <h3>Diagnostico:</h3>
                
                <div className="diagnostico-presuntivo-container">
                    <input className="ckb-Diagnostico" id="ckb-Diagnostico" type="checkbox"/>
                    <label for="ckb-Diagnostico">Diagnostico Presuntivo</label>
                    <input disabled type="text"/>
                </div>
        
                <div className="diagnostico-definitivo-container">
                    <label for="ckb-Diagnostico">Diagnostico Definitivo</label>
                    <input  type="text"/>
                </div>
        
        
                </div>
        
                <h3>Tratamiento</h3>
                <div className="tratamiento-container">
                    
                    <div>
                    <label for="medicamneto">Medicamento:</label>
                    <input id="medicamneto" className="medicamneto" type="text"/>
                    </div>
                    <div>
                    <label for="presentacion">Presentación:</label>
                    <input id="presentacion" className="presentacion" type="text"/>
                    </div>
                    <div>
                    <label for="modo-uso">Modo de uso:</label>
                    <input id="modo-uso" className="modo-uso" type="text"/>
                    </div>
                    <div>
                    <label for="cantidad-tomar">Cantidad a usar:</label>
                    <input id="cantidad-tomar" className="cantidad-tomar" type="number"/>
                    </div>
                    <div>
                    <label for="frecuencia-diaria">Frecuencia diaria(hs):</label>
                    <input id="frecuencia-diaria" className="frecuencia-diaria" type="number" placeholder="Cada 2 hs"/>
                    </div>
                    <div>
                    <label for="dias-tratamiento">Dias de tratamiento:</label>
                    <input id="dias-tratamiento" className="dias-tratamiento" type="number" placeholder="7 dias"/>
                    </div>
                    
                    <button className="anhadir">Añadir tratamiento</button>
                </div>
        
                <div className="opciones">
                    <button>Guardar</button>
                    <button>Limpiar</button>
                    <button>Cancelar</button>
                </div>
                
            </div> 
    )
        
    
}

export default MedicalConsultation;