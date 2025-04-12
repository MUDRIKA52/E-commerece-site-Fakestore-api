import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import { CartProvider } from "./context/CartContext"; 
import { ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify styles

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to open product modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <CartProvider>
      <div>
        {/* ✅ Toast Notifications for Cart Actions */}
        <ToastContainer position="top-right" autoClose={2000} />

        {/* ✅ Navbar with category selection */}
        <Navbar onCategorySelect={setSelectedCategory} />

        {/* ✅ Hero Section */}
        <HeroSection />

        {/* ✅ Product List with filtering and click handler */}
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
          <ProductList 
            selectedCategory={selectedCategory} 
            onProductClick={handleProductClick} 
          />
        </div>

        {/* ✅ Product Modal for selected product */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            closeModal={() => setSelectedProduct(null)}
          />
        )}

        {/* ✅ Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
