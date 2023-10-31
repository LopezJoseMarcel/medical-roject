import React from "react";
import '../styles/PatientGeneraInfo.css'


const PatientInfoComponent = ({user}) => {


    return(
        <div className="max-container">
          <div className="full-name">
            <h3 className="name" id="name">{user?.nombre}</h3>
            <h3 className="last-name" id="last-name">{user?.apellido}</h3>
          </div>
          <div className="mail-container">
            <h3 className="mail" id="mail" >{user?.email}</h3>
          </div>
          <div className="info-container">
            <div className="info">
              <label htmlFor="phone-number">Número de teléfono:</label>
              <input disabled defaultValue={Number(user?.movil)} className="phone-number" id="phone-number" type="number"/>
              <label htmlFor="ci">Número de Cedula:</label>
              <input disabled defaultValue={Number(user?.cedula) } className="ci" id="ci" type="number"/>
              <label htmlFor="birth-date">Fecha de nacimiento:</label>
              <input disabled defaultValue={user?.fecha_nacimento} className="birth-date" id="birth-date" type="text" />
              <label htmlFor="gender">Género:</label>
              <input disabled defaultValue={user?.genero} className="gender" id="gender" type="text" />
           </div>
            <div className="address-container">
              <h3>Dirección</h3>
              <label htmlFor="street">Calle:</label>
              <input disabled defaultValue={user.direccion.calle} className="street" id="street" type="text"  />
              <label htmlFor="neighborhood">Barrio:</label>
              <input disabled defaultValue={user.direccion.barrio} className="neighborhood" id="neighborhood" type="text" />
              <label htmlFor="neighborhood">Ciudad:</label>
              <input disabled defaultValue={user.direccion.ciudad}  className="neighborhood" id="neighborhood" type="text" />
            </div>
        </div> 
     </div>
    );
}

export default PatientInfoComponent;