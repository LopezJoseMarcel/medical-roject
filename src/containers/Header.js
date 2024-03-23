import React,{useContext, useState} from 'react';
import '../styles/Header.css';
import { AiOutlineMenu } from "react-icons/ai";
import MenuRespond from '../components/MenuRespond';
import logo from '../assets/logoDR.svg';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Context from '../context/UserContext';
import imgFondo from '../assets/fondo.png';
import imgCita from '../assets/citas.png';
import imgInfo from '../assets/info_paciente.png';
import { useNavigate } from "react-router-dom";

const Header = () => {
  //Toggle Menu 
  const [toggleMenu,setToggleMenu] = useState(false); //Inicializamos en false para que no de muestre

  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  }
  //end toggle menu

   //Toggle  
   const [toggleMenuRespond,setToggleMenuRespond] = useState(false); //Inicializamos en false para que no de muestre

   const handleToggleMenuRespond = () => {
     setToggleMenuRespond(!toggleMenuRespond);
   }
   //end toggle menu

  // const isLoggedIn = false
  const {isLoggedIn,logout} = useUser()
  const { userInfo } = useContext(Context);

  //evitar la navegacion del logout
  const handleClick = (e) => {
    e.preventDefault();
    logout();
  }

  const handleVerificadorPaciente = () => {
    if (userInfo && userInfo.rol != 'paciente' && userInfo.rol != 'admin') {
      alert("No posee el rol necesario para acceder a este módulo!");
      navigate('/');
    } else if(!isLoggedIn) {
      alert("No ha iniciado sesión!");
      navigate('/');
    }
  }

  const handleVerificadorMedico = () => {
    if (userInfo && userInfo.rol != 'medico' && userInfo.rol != 'admin') {
      alert("No posee el rol necesario para acceder a este módulo!");
      navigate('/');
    } else if(!isLoggedIn) {
      alert("No ha iniciado sesión!");
      navigate('/');
    }
  }

  return(
    <>
     <nav>
    <AiOutlineMenu size={'50px'} className='menu' onClick={handleToggleMenuRespond}/>
   <div className="navbar-left">
    <Link  to="/">
      <img src={logo} alt="logoDR" className="logo" />
    </Link>
    
    <ul>
      <li>
        <Link onClick={handleVerificadorPaciente} to={ userInfo && (isLoggedIn && (userInfo.rol == 'paciente' || userInfo.rol == 'admin'))  ? "/info-patient" : "/"}>
          Mi información Médica
        </Link>
      </li>
      <li>     
        <Link onClick={handleVerificadorPaciente} to={ userInfo && (isLoggedIn && (userInfo.rol == 'paciente' || userInfo.rol == 'admin'))  ? "/appointment-page" : "/"}>
          Citas Médicas
        </Link>
      </li>
      <li>                                   
        <Link onClick={handleVerificadorMedico} to={ userInfo && (isLoggedIn && (userInfo.rol == 'medico' || userInfo.rol == 'admin'))  ? "/doctor-page" : "/"}>
          Consulta
        </Link>
      </li>
      <li>       
        <Link onClick={handleVerificadorMedico} to={ userInfo && (isLoggedIn && (userInfo.rol == 'medico' || userInfo.rol == 'admin'))  ? "/disease-train" : "/"}>
          Entrenamiento de Modelos
        </Link>
      </li>
      <li>        
        <Link onClick={handleVerificadorMedico} to={ userInfo && (isLoggedIn && (userInfo.rol == 'medico' || userInfo.rol == 'admin'))   ? "/informes" : "/"}>Informes</Link>
      </li>
      <li>
        <Link onClick={handleVerificadorMedico} to={ userInfo && (isLoggedIn && (userInfo.rol == 'medico' || userInfo.rol == 'admin'))   ? "/pacientes" : "/"}>Pacientes</Link>
      </li>
    </ul>
   </div>
   <div className="navbar-right">
    <ul>
     
        
      <li className='navbar-email'>
        {
          isLoggedIn 
          ? <Link to='/info-patient'>
            {userInfo?.email}
           </Link>
          : 
          <span>
            No ha iniciado sesion
          </span>
        }
        
      </li>
      
      
      <li className="navbar-email" onClick={handleToggleMenu}>
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
   
 </nav>
     {<img id='img-fondo' src={imgFondo} />}
     {<div id='container-nave'>
       <h2 id='titulo'>SkinSmartML</h2>
       <Link onClick={handleVerificadorPaciente} to={ userInfo && (isLoggedIn && (userInfo.rol == 'paciente' || userInfo.rol == 'admin'))  ? "/appointment-page" : "/"}>
         <img id='img-cita-info' src={imgCita}/>
       </Link>
       <Link onClick={handleVerificadorPaciente} to={ userInfo && (isLoggedIn && (userInfo.rol == 'paciente' || userInfo.rol == 'admin'))  ? "/info-patient" : "/"}>
         <img id='img-cita-info' src={imgInfo}></img>
       </Link>
      </div>}
     {toggleMenuRespond && <MenuRespond/>}
    </>
  

  )
};
 //{toggleMenu &&  <Menu/>}
export default Header;