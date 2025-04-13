import React from 'react';
import Items from "../../Pages/Items";
import '../../Pages/all.css';
import {useState,useEffect} from 'react';

export const Update=()=>{
    const [items, setItems] = useState([]);
    const [reload, setReload] = useState(false);
            useEffect(() => {
                fetch("http://localhost:8080/product/all") // Fetching from backend
                    .then((response) => response.json())
                    .then((data) => setItems(data))
                    .catch((error) => console.error("Error fetching items:", error));
                }, [reload]);
    return(
        <div className="product-list">
          {items.map((item,i)=>{
               return <Items key={i} id={item.id} price={item.price} name={item.name} 
               image={item.imageUrl} action="Modify" category={item.category} 
               quality={item.quality} reload={reload} setReload={setReload}/>
              })}
          </div>
)
}