import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route}  from 'react-router-dom';
import React,{useRef} from 'react';
import Cart from './Pages/Cart';
import Admin from './Pages/Admin';
import Bill from './Pages/Bill';
import Home from './Components/Home/Home';
function App() {
  return (
    <div>
    <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/'  element={<Home/>}/>
     <Route path='/admin' element={<Admin/>}/>
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/bill'  element={<Bill/>}/>
     </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
