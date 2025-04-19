import React from 'react';
import './Navbar.css';
import logo from '../Assets/Home_icon.png';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {useRef} from 'react';
import Items from "../../Pages/Items";
const Navbar = () => {
        const [links, setLinks] = useState("home");
        const [search,setSearch]=useState('');
        const handleSearch=(e)=>{
                setSearch(e.target.value);
        };
        
        return (
       <div className="navbar">
           <div className="navbar-logo">
               <img src={logo} alt="logo"/>
               <p className="shopify-text">Inventory</p>
           </div >
           <ul className="navbar-links">
                <li className="shopify" onClick={()=>setLinks("home")}><Link style={{textDecoration:'none',color:'Black'}} to="/">Home</Link>{links==="home"?<hr/>:<></>}</li>
               <li className="shopify" onClick={()=>setLinks("admin")}><Link style={{textDecoration:'none',color:'Black'}} to="/admin">Admin</Link>{links==="admin"?<hr/>:<></>}</li>
               <li className="shopify" onClick={()=>setLinks("cart")}><Link style={{textDecoration:'none',color:'Black'}}to="/cart">Cart</Link>{links==="cart"?<hr/>:<></>}</li>
               <div className="navbar-cart-count" style={links==="cart"?{marginTop:"-63px"}:{}}>2</div>
                <li className="shopify" onClick={()=>setLinks("bill")}><Link style={{textDecoration:'none',color:'Black'}}to="/bill">Bill</Link>{links==="bill"?<hr/>:<></>}</li>
           </ul>
          <div className="navbar-search">
                <input type="text" placeholder="Search" onChange={(e)=>handleSearch(e)}/>
                <button>Search</button>
            </div>
       </div>
    );
}

export default Navbar;