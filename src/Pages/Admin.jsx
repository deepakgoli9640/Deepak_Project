 import React from 'react';
 import './admin.css';
import {useEffect} from 'react';
 import{Link} from  'react';
 import Data from './Data.json';
 import {useState} from 'react';
import Items from './Items.jsx';
import {All} from './All';
import {Delete} from '../Components/Admin/Delete';
import {Update} from '../Components/Admin/Update';
import {Add} from '../Components/Admin/Add';
const Admin=()=>{
    const[active,setActive]=useState("all");

    return(
        <div className>
            <ul className="nav nav-tabs" style={{backgroundColor:"#E6FAF5"}}>
              <li className="nav-item">
                <a className={`nav-link ${active==="update"? "active":""}`}aria-current="page" href="#" onClick={()=>setActive("update")}

                    style={{color:"black"}}>
                  Update

                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${active==="all" ? "active" : ""}`} href="#"  style={{color:"black"}} onClick={()=>setActive("all")}>
                  All Items
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${active==="add" ? "active" : ""}`} href="#" style={{color:"black"}} onClick={()=>setActive("add")}>
                  Add an Item
                </a>
              </li>
              <li className="nav-item">
                <a className= {`nav-link ${active==="delete" ? "active" : ""}`} href="#" style={{color:"black"}} onClick={()=>setActive("delete")}>
                  Delete an Item
                </a>
              </li>
            </ul>
            <div className="nav-item">
                {active==="update" && <Update/>}
                {active==="all" && <All/>}
                {active==="add" && <Add/>}
                {active==="delete" && <Delete/>}
         </div>
         </div>


        );
    }
export default Admin;
