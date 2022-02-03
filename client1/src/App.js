import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import NavBar from './components/UI/NavBar.jsx'; 
import Footer from './components/Footer.jsx';
import AppRouter from './components/AppRouter.js';
import {AuthContext} from './context/index';
import Cookies from 'js-cookie';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      if (Cookies.get('auth_token')) {
          setIsAuth(true);
      }
      setLoading(false);
  }, []);

  return (
  <AuthContext.Provider value={{
    isAuth,
    setIsAuth,
    isLoading
  }}
  >
    <BrowserRouter>
        <NavBar/>
          <AppRouter/>
        <Footer/>
    </BrowserRouter>
  </AuthContext.Provider>
  );
}

export default App;
