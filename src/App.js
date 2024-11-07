import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginContextProvider from './context/LoginContext';

function App() {
  return (
    <LoginContextProvider>
    <Header/>

    <Outlet/>

    <Footer/>
    </LoginContextProvider>
  );
}

export default App;
