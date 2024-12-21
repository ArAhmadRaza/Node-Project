import { ProductList } from "../../components/productList/ProductList";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
    style={{
      backgroundColor: "aquamarine"
    }}
    >
      <Link to={"/products"}>Add Products</Link>
      <ProductList />
    </div>
  );
}
