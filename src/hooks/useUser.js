import { useContext, useState } from "react";
import Context from "../context/UserContext";
import { useCallback } from "react";
import loginService from "../services/loginService";
import getProfile from '../services/profile';

export default function useUser() {
    //get thw jwt from context
    const {jwt, setJwt} = useContext(Context);
    const {userInfo, setUserInfo} = useContext(Context);
    //State for login
    const [state, setState] = useState({loading: false, error: false})
    
    //metodo para hacer Login
    const login = useCallback((email, contrasenha) => {
        setState({loading: true, error: false});
        loginService({ email, contrasenha })
    .then((jwt) => {
      window.sessionStorage.setItem("jwt", jwt);
      setState({ loading: false, error: false });
      setJwt(jwt);

      // Llamar a getProfile y actualizar el contexto con la información del perfil
      getProfile(jwt)
        .then((userInfo) => {
          // Actualizar el contexto con la información del perfil
          // Puedes agregar más estados al contexto si es necesario
          window.sessionStorage.setItem("userInfo",userInfo);
          setUserInfo(userInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((err) => {
      window.sessionStorage.removeItem("jwt");
      window.sessionStorage.removeItem("userInfo");
      setState({ loading: false, error: true });
      console.error(err);
    });
}, [setJwt, setUserInfo]);

    const logout = useCallback(() => {
      window.sessionStorage.removeItem('jwt');
      setJwt(null)  
    },[setJwt])


    return {
        isLoggedIn: Boolean(jwt),
        isLoginLoading: state.loading,
        isLogingError: state.error,
        login,
        logout,
    }
}