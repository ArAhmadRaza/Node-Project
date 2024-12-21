import React, { useState } from "react";
import * as yup from "yup";
import { addProduct } from "../../store/slices/productSlice";
import { useDispatch } from "react-redux";





function AddProduct() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc");
  const [category, setCategory] = useState("");
  
  // State to hold error messages
  const [errors, setErrors] = useState({});

  // Yup schema with custom error messages
  const Schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
  });

  const onClickAddProduct = async (e) => {
    e.preventDefault(); // prevent default form submit action
    let product = {
      title,
      price: parseFloat(price), // ensure price is treated as a number
      description,
      image,
      category,
    };

    try {
      // Validate product details with yup
      await Schema.validate(product, { abortEarly: false });
      setErrors({}); // Clear previous errors if validation passes
      dispatch(addProduct(product));
      alert("Product added successfully");
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message; // Map errors to their respective field paths
      });
      setErrors(validationErrors); // Set the error state
    }
    console.log("Add Products", product);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Add Product</h2>
      <form onSubmit={onClickAddProduct}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>} {/* Display title error */}
        </label><br/>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <span style={{ color: 'red', fontSize: '0.9em', margin: '5px 0' }}>{errors.price}</span>} {/* Display price error */}
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>} {/* Display description error */}
        </label><br/>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {errors.category && <span style={{ color: 'red' }}>{errors.category}</span>} {/* Display category error */}
        </label>
        <br />
        <button
          type="submit"
          style={{
            cursor: "pointer",
            padding: "5px",
            fontWeight: "bold",
            backgroundColor: "aqua",
            border: "1px solid aqua",
            borderRadius: "3px",
            opacity: "0.9",
            transition: "background-color 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "lightblue",
            },
            
            "&:disabled": {
              opacity: "0.5",
              cursor: "not-allowed",
            },

            "&:focus": {
              outline: "none",
            },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
