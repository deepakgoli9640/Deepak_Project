import React, { useState } from "react";
import "./Items.css";
import badge1 from './ItemAssests/quality.png';

const Items = (props) => {
  const [update, setUpdate] = useState({}); // Tracks if input field is shown
  const [newPrice, setNewPrice] = useState(props.price); 
  const [newQuantity,setNewQuantity]=useState(0);// Stores new price


  const handleClick = (id) => {
      setUpdate((prevState) => ({ 
        ...prevState,
        [id]: !prevState[id], // Toggle input field visibility
      }));
      setNewPrice(props.price); // Set new price
    }
    const handleModifyCart=async(id)=>{
        const updatedCart={
          name:props.name,
          price:props.price,
          cart_quantity:newQuantity,
          category:props.category,
          product_id:id,
        };
        try {
          const response = await fetch("http://localhost:8080/cart/add",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCart),
          });
    
          if (response.ok) {
            alert("Item added to Cart");
          }
          else {
            alert("Failed to add Item to Cart.");
          }
        } catch (error) {
          console.error("failed to add Item:", error);
        }
      };
    

  const handleModify = async (id) => {
    if (parseFloat(newPrice) === parseFloat(props.price)) {
      alert("press cancel if you dont want to modify price");
      props.setReload(prev => !prev);
      return;
    };
    const updatedProduct = {
      name:props.name,
      price: newPrice,
      category:props.category,
      quality:props.quality,
      imageUrl:props.image,
    };
  

    try {
      const response = await fetch(`http://localhost:8080/product/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        alert("Price updated successfully!");

        // Fetch updated product list
        const res = await fetch("http://localhost:8080/product/all");
        if (!res.ok) throw new Error("Failed to fetch updated product list");

        const data = await res.json();
        setUpdate((prevState) => ({ ...prevState, [id]: false}));
        props.setItems(data);  // Hide input field after update
      }
      else {
        alert("Failed to update price.");
      }
    } catch (error) {
      console.error("Error updating price:", error);
    }
    props.setReload(prev => !prev);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/product/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully!");

        // Fetch updated product list
        const res = await fetch("http://localhost:8080/product/all");
        if (!res.ok) throw new Error("Failed to fetch updated product list");

        const data = await res.json();
        props.setItems(data);
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card" style={{ width: "18rem", height: "28rem" }}>
      <img src={props.image} className="card-img-top" alt={props.name} />
      {props.quality==='1st quality' &&(
      <img
    src={badge1}
    alt="badge"
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      height: "50px",
      display:"block",
       }}
      />)}
      <div className="card-body">
        <h5 className="card-text">{props.name}</h5>
        <h6 className="card-title">{props.category} : ₹{newPrice}</h6>
        {props.action === 'Modify' ? (
          update[props.id] && (
         <input
          type="number"
          placeholder="Enter updated price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
         />
          )
           ) : (
        update[props.id] && (
          <input
        type="number"
        placeholder="Enter Quantity"
         value={newQuantity}
        onChange={(e) => setNewQuantity(e.target.value)}
           />
           )
         )} 
      
        <div className="cardButton">
          <button
            className="button"
            onClick={() => {
              if (props.action ==="Modify") {
                if (update[props.id] && newPrice) {
                  handleModify(props.id); // Second click updates price
                } else {
                  handleClick(props.id); // First click shows input field
                }
              } else if (props.action === "Delete") { 
                handleDelete(props.id);
              } else if (props.action === "Add") {
                  if(update[props.id] && newQuantity){
                     handleModifyCart(props.id);
                  }
                  else
                  {
                    handleClick(props.id);
                  }
              }
            }}>
        
            {props.action}
          </button>
          {update[props.id] && <div className='cardButton'> 
            <button
                  className="btn btn-outline-primary ms-2" onClick={()=>handleClick(props.id)}
                >
                cancel
          </button>
            </div>
                }
       </div>
      </div>
    </div>
  )
};
export default Items;
