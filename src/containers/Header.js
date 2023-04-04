import React,{useState} from 'react';
import '../styles/Header.css';
import Menu from '../components/Menu';
import { AiOutlineMenu } from "react-icons/ai";
import MenuRespond from '../components/MenuRespond';
import logo from '../assets/logoDR.svg';

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
    <img src={logo} alt="logoDR" className="logo" />
    <ul>
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