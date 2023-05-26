import { useContext } from "react";
import Context from "../context/UserContext";
import { useCallback } from "react";
import loginService from "../services/loginService";

export default function useUser() {
    //get thw jwt from context
    const {jwt, setJwt} = useContext(Context)

    //metodo para hacer Login
    const login = useCallback((email, contrasenha) => {
        setJwt(loginService({email, contrasenha})
         .then(jwt => {
            console.log(jwt)
            setJwt(jwt)
         }
         ).catch(error => console.log(error))
        )

    }, [setJwt]) 

    const logout = useCallback(() => {
      setJwt(null)  
    },[setJwt])


    return {
        isLoggedIn: Boolean(jwt),
        login,
        logout,
    }
}