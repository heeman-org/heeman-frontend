import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ConstantsProvider } from "./context/ConstantsContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Wishlist from "./pages/Wishlist";
import EnquiryForm from "./pages/EnquiryForm";

function App() {
  return (
    <ConstantsProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="enquiry" element={<EnquiryForm />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
        </CartProvider>
      </WishlistProvider>
    </ConstantsProvider>
  );
}

export default App;