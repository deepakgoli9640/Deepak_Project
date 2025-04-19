import React, { useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./cart.css";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity,setQuantity]=useState({});
  const handleChangeQuantity=(id,newQuantity)=>
  {
    setQuantity((prevQuantity)=>({
      ...prevQuantity,
      [id]:newQuantity,
    }));
    };
  
 
  useEffect(() => {
    fetch("http://localhost:8080/cart/") // Fetching from backend
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error("Error fetching items:", error));
    }, []);
    const handleDelete=async(id)=>
    {
      try {
        const response = await fetch(`http://localhost:8080/cart/delete/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          alert("cart Item deleted successfully!");
  
          // Fetch updated product list
          const res = await fetch("http://localhost:8080/cart/");
          if (!res.ok) throw new Error("Failed to fetch updated cart list");
  
          const data = await res.json();
          setCartItems(data);
        } else {
          alert("Failed to delete cart Item.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div className='table'>
    <div className="flex justify-center mt-10">
  <div className="overflow-x-auto">
    <table className="table-auto border border-black-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Product ID</th>
          <th className="border border-gray-300 px-4 py-2">Product Name</th>
          <th className="border border-gray-300 px-4 py-2">Quantity</th>
          <th className="border border-gray-300 px-4 py-2">Price</th>
          <th className="border border-gray-300 px-4 py-2">Total</th>
          <th className="border border-gray-300 px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={item.cart_id}>
            <td className="border border-gray-300 px-4 py-2">{index+1}</td>
            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
            <td className="border border-gray-300 px-4 py-2"><input type='number' 
            value={quantity[item.cart_id] || item.cart_quantity}
            onChange={(e)=>handleChangeQuantity(item.cart_id,e.target.value)}/>
            </td>
            <td className="border border-gray-300 px-4 py-2">₹{item.price}</td>
            <td className="border border-gray-300 px-4 py-2">₹
              {(quantity[item.cart_id] || item.cart_quantity) * item.price}</td>
            <td className="border border-gray-300 px-4 py-2">
            <button
                  className="button"
                  onClick={()=>handleDelete(item.cart_id)}
                >
                  🗑 Remove
                </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
  )
};
export default Cart;