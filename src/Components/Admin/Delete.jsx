import React from 'react';
import Items from "../../Pages/Items";
import '../../Pages/all.css';
import {useState,useEffect} from 'react';
export const Delete=()=>{
  
  const [items, setItems] = useState([]);
  useEffect(() => {
      fetch("http://localhost:8080/product/all") 
          .then((response) => response.json())
          .then((data) => setItems(data))
          .catch((error) => console.error("Error fetching items:", error));
      }, []);
return(
  <div className="product-list">
    {items.map((item,i)=>{
         return <Items key={i} id={item.id} price={item.price} name={item.name} image={item.imageUrl} category={item.category} action="Delete" setItems={setItems}/>
        })}
    </div>
)
}



