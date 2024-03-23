import React, { useState, useEffect } from 'react';

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [jwt, setJwt] = useState(() => window.sessionStorage.getItem('jwt') || null);
  const [userInfo, setUserInfo] = useState(() => JSON.parse(window.sessionStorage.getItem('userInfo')) || null);

  // useEffect para cargar los valores de sessionStorage al montar y cada vez que cambien
  useEffect(() => {
    window.sessionStorage.setItem('jwt', jwt);
    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [jwt, userInfo]);

  return (
    <Context.Provider value={{ jwt, setJwt, userInfo, setUserInfo }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
