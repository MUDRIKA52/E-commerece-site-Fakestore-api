import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Import cart context
import "../styles/ProductModal.css";

const ProductModal = ({ product, closeModal }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Use global addToCart function

  if (!product) return null;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    // ✅ Ensure toast notification fires once and modal closes smoothly
    setTimeout(() => {
      closeModal();
    }, 300); 
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>&times;</span>
        
        <div className="modal-body">
          <img src={product.image} alt={product.title} className="product-image" />
          
          <div className="product-details">
            <h2 className="product-title">{product.title}</h2>
            
            <p className="product-rating">
              ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0} reviews) |{" "}
              <span className={product?.inStock ? "in-stock" : "out-of-stock"}>
                {product?.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <h3 className="product-price">₹{product.price.toFixed(2)}</h3>
            <p className="product-description">{product.description}</p>
            
            <div className="quantity-container">
              <button className="quantity-btn" onClick={handleDecrease}>-</button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={handleIncrease}>+</button>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;






