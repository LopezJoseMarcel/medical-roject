import React from "react";
import '../styles/MenuRespond.css';

const MenuRespond = () => {
  return(
  <div className="mobile-menu">
    <ul>
      <li>
        <a href="/">Menu</a>
      </li>
      <li>
        <a href="/">Mi información Médica</a>
      </li>
      <li>
        <a href="/">Citas Médicas</a>
      </li>
      <li>
        <a href="/">Contactanos</a>
      </li>
      <li>
        <a href="/">Quienes somos</a>
      </li>
    </ul>

    <ul>
      <li>
        <a href="/">My account</a>
      </li>
    </ul>

    <ul>
      <li>
        <a href="/" className="email">platzi@example.com</a>
      </li>
      <li>
        <a href="/" className="sign-out">Sign out</a>
      </li>
    </ul>
  </div>
  );
} 

export default MenuRespond;

  
