import {
  Home,
  ProductResult,
  Category,
  Product,
  Payment,
  Success,
  CreateUser,
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
          <Route path="/product" exact element={<Product />} />
          <Route path="/payment" exact element={<Payment />} />
          <Route path="/success" exact element={<Success />} />
          <Route path="/seller/dashboard" exact element={<Dashboard />} />
          <Route path="/delivery" exact element={<Deliver />} />
          <Route path="/create/user" exact element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
