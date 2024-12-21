import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  // deleteProducts,
  deleteProductsApiAction,
} from "../../store/slices/productSlice";
import "../productList/productList.css";

export function ProductList() {
  const products = useSelector((store) => store.productSlice.products);
  const dispatch = useDispatch();
  console.log("Products in Components", products);



  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()); // Fetching products on component mount
    }
  }, [dispatch]); // Empty dependency array to only run once on component mount

  // const onClickGetProducts = () => {
  //   dispatch(fetchProducts()); // Fetching products from the API

  //   console.log("Products in Actions", products); // Logs the updated products after fetching
  // }

  const onClickDeleteProducts = (id) => {
    // dispatch(deleteProducts(id)); // Removing a single product by id
    console.log("Products in Actions after deleting", id); // Logs the updated products after deleting all
    dispatch(deleteProductsApiAction(id)); // Removing a single product by id from the API
  };

  return (
    <div>
      <h1 style={{ margin: "7px", textAlign: "center", fontSize: "40px" }}>
        List of Products
      </h1>

      {/* <button style={{backgroundColor: "red", padding: "6px",cursor: "pointer", borderRadius: "7px"}} onClick={onClickGetProducts}>Get Products</button> */}
      {products?.map((product) => {
        return (
          <div key={product.id} className="parent" style={{ display: "flex" }}>
            <div style={{ padding: 10 }}>
              <img
                style={{ width: "100px", height: "130px", borderRadius: "8px" }}
                src={product.image}
                alt={product.title}
              />
            </div>
            <div>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <h3>{product.price}</h3>
              <div style={{ display: "flex" }}>
                <button className="btn-62">
                  <span>Update</span>
                </button>
                <button
                  onClick={() => onClickDeleteProducts(product.id)}
                  className="btn-62"
                >
                  <span>Delete</span>
                </button>
              </div>

              <hr
              style={{
                border: "none",
                height: "1px",
                backgroundColor: "aquamarine",
                margin: "10px 0"
              }}
              />
            </div>
          </div>
        );
      })}

    </div>
  );
}
