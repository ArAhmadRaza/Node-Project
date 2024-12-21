import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Products from "../pages/products/Products";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}




