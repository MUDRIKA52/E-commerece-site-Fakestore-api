import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import ProductModal from "../components/ProductModal";

 const products = [
  /* { id: 1, title: "Product 1", price: 20, description: "Great product", image: "image_url" },
  { id: 2, title: "Product 2", price: 30, description: "Awesome item", image: "image_url" } */
]; 

const Home = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <h1>Our Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} onClick={() => setSelectedProduct(product)}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          closeModal={() => setSelectedProduct(null)} 
          addToCart={addToCart} 
        />
      )}
    </div>
  );
};

export default Home;
