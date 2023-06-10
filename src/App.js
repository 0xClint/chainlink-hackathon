import {
  Home,
  ProductResult,
  Category,
  Product,
  Payment,
  Success,
  CreateUser,
  Orders,
  CreateProduct,
} from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Seller/Dashboard";
import Deliver from "./pages/Delivery/Deliver";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/category" exact element={<Category />} />
          <Route path="/result/:id" exact element={<ProductResult />} />
          <Route path="/product/:id" exact element={<Product />} />
          <Route path="/payment/:id" exact element={<Payment />} />
          <Route path="/success/:id" exact element={<Success />} />
          <Route path="/seller/dashboard" exact element={<Dashboard />} />
          <Route path="/delivery/:id" exact element={<Deliver />} />
          <Route path="/create/user" exact element={<CreateUser />} />
          <Route path="/create/product" exact element={<CreateProduct />} />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
