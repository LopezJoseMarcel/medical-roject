import React,{useContext, useState} from "react";
import '../styles/MenuRespond.css';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Context from '../context/UserContext';

const MenuRespond = () => {

  const {isLoggedIn,logout} = useUser()
  const { userInfo } = useContext(Context);

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  }

  return(
  <div className="mobile-menu">
    <ul>
      <li>
        <Link to='/info-patient'>
          Mi información Médica
        </Link>
      </li>
      <li>
        <Link to='/appointment-page'>
          Citas Médicas
        </Link>
      </li>
    </ul>
    <ul>
      <li>
        <h3>My account</h3>
      </li>
    </ul>

    <ul>
       
        <li>
          {isLoggedIn ? 
            <h4 className="email">{userInfo.nombre} {userInfo.apellido}</h4>
            :
            <h4>No ha iniciado sesión </h4>
          }
        </li>
        <li>
          {isLoggedIn ? 
            <h4 className="email">{userInfo.email}</h4>
            :
            <h4></h4>
          }
        </li>
      <li>
        {
          isLoggedIn 
            ? <Link to='/' onClick={handleClick}>
              Logout
            </Link>
            : <Link to='/forms'>
              Login
            </Link>
          }
      </li>
    </ul>
  </div>
  );
} 

export default MenuRespond;

  
