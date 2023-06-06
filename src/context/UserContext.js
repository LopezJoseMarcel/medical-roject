import React, {useState} from'react';

const Context = React.createContext({})

export function UserContextProvider({children}) {
    const [jwt, setJwt] = useState(() => window.sessionStorage.getItem('jwt'))
    const [userInfo, setUserInfo] = useState(() => window.sessionStorage.getItem('userInfo'));

    return <Context.Provider value={{jwt, setJwt, userInfo,setUserInfo}} > 
     {children}
    </Context.Provider>
    
}

export default Context;