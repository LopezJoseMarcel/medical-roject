import React, { useState } from "react";

const Register = (props) => {
  //using hook to handle the email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();  

    console.log(email);
    console.log(password);
    console.log(name); 
  }

    return(
      <div className="max-container">
        <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="input-name">Nombre</label>
        <input value={name} name="name" type="text"
          id="input-name" onChange={(e) => {setName(e.target.value)}}
          placeholder="Nombre completo"
        />

        <label  htmlFor="input-email" >Correo</label>
        <input value={email} name="email" type="email"
          id="register-input-email" placeholder="tucorreo@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="input-password" >Contraseña</label>
        <input value={password} name="password" id="register-input-password" 
          type="password" placeholder=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button-form">Crear</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
        Ya tengo una cuenta? Inicie sesion aqui.
      </button>
     </div>
      
     
    )
}

export default Register;