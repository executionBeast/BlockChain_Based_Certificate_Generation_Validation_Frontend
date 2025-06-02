import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';
function App() {
  const route = useLocation()
  return (
    <>
    <Header/> 
    <Outlet/>
    {route.pathname === "/login" || route.pathname === "/signup"  ?    <></>     
    
    :
    // <Footer/>
    <></>
    
     }
    </>  
  );
}

export default App;


  // <>
  //   {route.pathname === '/login' || route.pathname === '/signup' ?  <Outlet/>
  //   :  
  //   <>
  //   <Header/> <Outlet/>   <Footer/>
  //   </>  
  //   }
  
  // </>