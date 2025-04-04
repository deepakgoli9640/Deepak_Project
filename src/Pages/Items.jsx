import React, { useState } from "react";
import "./Items.css";

const Items = (props) => {
  const [update, setUpdate] = useState({}); // Tracks if input field is shown
  const [newPrice, setNewPrice] = useState(props.price); // Stores new price

  const handleClick = (id) => {
    setUpdate((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle input field visibility
    }));
  };

  const handleModify = async (id) => {
    if (!newPrice.trim()) {
      return;
    }
    const updatedProduct = {
      id: props.id,
      name: props.name,
      category: props.category,
      price: newPrice,
      imageUrl: props.image
      // add any other fields if needed
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
      } else {
        alert("Failed to update price.");
      }
    } catch (error) {
      console.error("Error updating price:", error);
    }
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
              if (props.action === "Modify Price") {
                if (update[props.id] && newPrice.trim()) {
                  handleModify(props.id); // Second click updates price
                } else {
                  handleClick(props.id); // First click shows input field
                }
              } else if (props.action === "Delete") {
                handleDelete(props.id);
              } else if (props.action === "Add to Cart") {
                console.log("Added to Cart", props.id);
              }
            }}
          >
            {props.action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Items;
