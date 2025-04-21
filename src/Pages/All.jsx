import React from 'react';
import Data from './Data.json';
import Items from './Items.jsx';
import './all.css';
import {useState,useEffect} from 'react';

export const All=()=>{

    const [items, setItems] = useState([]);
        useEffect(() => {
            fetch("http://localhost:8080/product/all") // Fetching from backend
                .then((response) => response.json())
                .then((data) => setItems(data))
                .catch((error) => console.error("Error fetching items:", error));
            }, []);
    return(
        <div className="product-list">
          {items.map((item,i)=>{
               return <Items key={i} id={item.id} price={item.price} name={item.name} image={item.imageUrl} category={item.category} quality={item.quality} action="Add"/>
              })}
          </div>
)
}