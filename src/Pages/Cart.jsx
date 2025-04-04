import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Cart = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product A",
      price: 499,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Product B",
      price: 299,
      quantity: 2,
      image: "https://via.placeholder.com/50",
    },
  ]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="card mb-3 p-3">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img src={item.image} alt={item.name} className="img-fluid" />
              </div>
              <div className="col-md-3">
                <h5>{item.name}</h5>
                <p>₹{item.price}</p>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-outline-primary ms-2"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-danger"
                  onClick={() => removeItem(item.id)}
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <h4>Total: ₹{totalPrice}</h4>
      <button
        className="btn btn-success mt-3"
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
