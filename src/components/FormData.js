import React from "react";
import '../styles/FormData.css'

const FormData = () => {
    return(
        <div className="max-container">
          <div className="full-name">
            <h3 className="name" id="name">Jose Marcel</h3>
            <h3 className="last-name" id="last-name">Lopez</h3>
          </div>
          <div className="mail-container">
            <h3 className="mail" id="mail" >lopezbusiness@example.com</h3>
          </div>
          <div className="info-container">
            <div className="info">
              <label for="phone-number">Número de teléfono:</label>
              <input className="phone-number" id="phone-number" type="number"/>
              <label for="ci">Número de Cedula:</label>
              <input className="ci" id="ci" type="number"/>
              <label for="birth-date">Fecha de nacimiento:</label>
              <input className="birth-date" id="birth-date" type="text" />
              <label for="gender">Género:</label>
              <input className="gender" id="gender" type="text" />
           </div>
            <div className="address-container">
              <h3>Dirección</h3>
              <label for="street">Calle:</label>
              <input className="street" id="street" type="text"  />
              <label for="neighborhood">Barrio:</label>
              <input className="neighborhood" id="neighborhood" type="text" />
              <label for="neighborhood">Ciudad:</label>
              <input className="neighborhood" id="neighborhood" type="text" />
            </div>
            <button className="button-form">Aceptar</button>
        </div> 
     </div>
    );
}

export default FormData;