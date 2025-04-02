import React from 'react';
import './Items.css';
import {useState} from 'react';
import{Delete} from './All.jsx';
const Items=(props)=>{
  console.log(props.name);
    const[update,setUpdate]=useState([]);
      const handleClick = (id) => {
             setUpdate((prevState) => ({
                 ...prevState, // Preserve existing states
                 [id]: !prevState[id], // Toggle the state for this specific id
             }));
         };
        

        
         const handleDelete = async (id) => {
         
          try {
            const response = await fetch(`http://localhost:8080/product/delete/${id}`, {
              method: "DELETE",
            });
 
            if (response.ok) {
              
            
            
              try {
                const res = await fetch("http://localhost:8080/product/all"); // Use full URL if needed
                if (!res.ok) throw new Error("Failed to fetch updated product list");
            
                const data = await res.json();
                props.setItems(data);
                console.log(data); // Update items in the parent component
              }catch (error) {
                console.error("Error fetching updated product list:", error);
              } }
              else {
              alert("Failed to delete product.");
            }}
           catch (error) {
            console.error("Error:", error);
          
          }
        };

    return(
      
        <>
          <div className="card" style={{ width: "18rem",height:"26rem" }}>
            <img src={props.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-text">{props.name}</h5>
             <h6 className="card-title">{props.category}  : {props.price}</h6>
             {update[props.id] && <input type="number" placeholder="search"/>}
             <div className="cardButton">
              <a href="#" className="button"  onClick={()=>
              {if(props.action==="Modify Price")
                  handleClick(props.id)
                else if(props.action==="Delete")
                  handleDelete(props.id)
                else
                   console.log('Deepak');

                  }

                  }>

                {props.action}
              </a>
              </div>  
            </div>
          </div>
        </>
        )}

export default Items;
