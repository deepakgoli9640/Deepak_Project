import React, { useState } from "react";
import "./Items.css";
import badge1 from './ItemAssests/quality.png';

const Items = (props) => {
  const [update, setUpdate] = useState({}); // Tracks if input field is shown
  const [newPrice, setNewPrice] = useState(props.price); // Stores new price
  const handleClick = (id) => {
    setUpdate((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle input field visibility
    }));
    setNewPrice(props.price);
  };

  const handleModify = async (id) => {
    if (parseFloat(newPrice) === parseFloat(props.price)) {
      alert("price not changed");
      props.setReload(prev => !prev);
      return;
    }
  
        
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
        {update[props.id] && (
          <input
            type="number"
            placeholder="Enter new price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
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
              } else if (props.action === "Add to Cart") {
                console.log("Added to Cart", props.id);
              }
            }} >
        
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
  );
};

export default Items;
