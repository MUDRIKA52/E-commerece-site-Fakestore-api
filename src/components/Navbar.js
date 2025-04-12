import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Import Cart Context
import CartSidebar from "./CartSidebar"; // Import Cart Sidebar
import "../styles/Navbar.css";

const Navbar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false); // Sidebar visibility
  const [error, setError] = useState(""); // Handle errors
  const { cart } = useCart(); // Access cart items

  // ✅ Fetch categories from API
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data.map((cat) => cat.toLowerCase()))) // Ensure lowercase categories
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      });
  }, []);

  // ✅ Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setError(""); // Clear error when typing
  };

  // ✅ Handle category search
  const handleCategorySearch = () => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const matchedCategory = categories.find((cat) => cat.includes(lowerCaseSearch));

    if (matchedCategory) {
      onCategorySelect(matchedCategory); // ✅ Send valid category to ProductList
      setError(""); // ✅ Clear previous error
    } else {
      setError(`Category not found! Try one of these: ${categories.join(", ")}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Harmoni</div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Categories</li>
          <li>Contact Us</li>
          <li>More Options ▼</li>
        </ul>

        <div className="nav-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={handleSearch}
              onKeyPress={(e) => e.key === "Enter" && handleCategorySearch()} // ✅ Enter key triggers search
            />
            <button onClick={handleCategorySearch}><FaSearch /></button>
          </div>

          {/* ✅ Show error message dynamically */}
          {error && <p className="error-message">{error}</p>}

          {/* ✅ Cart Button - Opens Sidebar */}
          <div className="cart-container" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart className="cart-icon" />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </div>

          <FaUser className="user-icon" />
        </div>
      </nav>

      {/* ✅ Render Cart Sidebar when isCartOpen is true */}
      {isCartOpen && <CartSidebar closeSidebar={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;


