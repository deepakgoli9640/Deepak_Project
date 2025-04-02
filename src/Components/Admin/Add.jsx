import React from 'react';
import Items from "../../Pages/Items";
import '../../Pages/all.css';
import {useState,useEffect} from 'react';

export const Add = () => {
  
     const[values,setValues]=useState({
         name:'',
         imageUrl:'',
         category:'',
         price:''
         })
         const handleChange = (e) => {
          setValues((prevValues) => ({
              ...prevValues,
              [e.target.name]: e.target.value
          }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (values.category === 'select') {
          alert("Please select a valid category");
          setValues((prevValues) => ({
            ...prevValues,
            category: "select",
          }));
          return; // Stop submission
        }
      
        try {
          const response = await fetch("http://localhost:8080/product/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
      
          if (response.ok) {
            alert("Product added successfully!");
            setValues({ name: '', price: '', imageUrl: '', category: '' }); // Reset form
          } else {
            alert("Failed to add product.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };


            return(
                <div className="form">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" placeholder="Enter Product Name" name="name" onChange={(e)=>handleChange(e)} value={values.name} required/>

                        <label htmlFor="imageUrl">Image Url</label>
                        <input type="text" placeholder="Enter image Url" name="imageUrl" onChange={(e)=>handleChange(e)} value={values.imageUrl} reqiured/>

                        <label htmlFor="category">category</label>
                        <select name="category" id="category" onChange={(e)=>handleChange(e)} value={values.category} required>
                            <option value="select" selected>select</option>
                            <option value="price in grams">price in grams</option>
                            <option value="price per item">price per item</option>
                        </select>

                        <label htmlFor="price">Price</label>
                        <input type="number" placeholder="Enter price of product" name="price" onChange={(e)=>handleChange(e)} value={values.price} required/>
                      <div className="submit">
                      <button type="submit" className="button">
                        Submit
                      </button>
                      </div>


                    </form>
                </div>

                )
            };

