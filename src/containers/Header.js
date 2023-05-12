import React,{useState} from 'react';
import '../styles/Header.css';
import Menu from '../components/Menu';
import { AiOutlineMenu } from "react-icons/ai";
import MenuRespond from '../components/MenuRespond';
import logo from '../assets/logoDR.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  //Toggle Menu 
  const [toggleMenu,setToggleMenu] = useState(false); //Inicializamos en false para que no de muestre

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

  return(
    <>
     <nav>
    <AiOutlineMenu size={'50px'} className='menu' onClick={handleToggleMenuRespond}/>
   <div className="navbar-left">
    <Link to="/">
      <img src={logo} alt="logoDR" className="logo" />
    </Link>
    
    <ul>
      <li>
        <Link to="/info-patient">Mi información Médica</Link>
      </li>
      <li>  
        <Link to="/appointment-page">Citas Médicas</Link>
      </li>
      <li>
        <Link to="/doctor-page">Consulta</Link>
      </li>
      <li>
        <a href="/">Quienes somos</a>
      </li>
    </ul>
   </div>
   <div className="navbar-right">
    <ul>
      <li className="navbar-email" onClick={handleToggleMenu}>
        lolososi@example.com
      </li>
      
    </ul>
  </div>
   
 </nav>
     {toggleMenu &&  <Menu/>}
     {toggleMenuRespond && <MenuRespond/>}
    </>
  

  )
};

export default Header;