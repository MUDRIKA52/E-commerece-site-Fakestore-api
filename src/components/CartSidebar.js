import React from "react";
import { useCart } from "../context/CartContext"; // Import cart context
import "../styles/CartSidebar.css";
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const CartSidebar = ({ closeSidebar }) => {
  const { cart, cartCount, removeFromCart } = useCart(); // Get cart items, count & remove function

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Handle Buy Now
  const handleBuyNow = () => {
    toast.success("Billing details sent to your email! 📩", { autoClose: 3000 });
    closeSidebar(); // Close sidebar after purchase
  };

  return (
    <div className="cart-sidebar-overlay" onClick={closeSidebar}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <button className="close-sidebar" onClick={closeSidebar}>×</button>
        <h2>Your Cart ({cartCount})</h2>

        <div className="cart-items">
          {cart.length > 0 ? cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} className="cart-item-img" />
              <div className="cart-item-details">
                <p className="cart-item-title">{item.title}</p>
                <p>₹{(item.price * item.quantity).toFixed(2)} ({item.quantity}x)</p>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          )) : <p className="empty-cart">Your cart is empty.</p>}
        </div>

        {cart.length > 0 && (
          <>
            <h3>Total: ₹{totalPrice}</h3>
            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;

