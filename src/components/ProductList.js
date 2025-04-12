import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductModal from "./ProductModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ProductList.css";

function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "https://fakestoreapi.com/products";
        if (selectedCategory) {
          url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
        }

        console.log("Fetching data from:", url); // ✅ Debugging

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // ✅ Check if data is received

        setProducts(
          data.map((product) => ({
            ...product,
            isNew: Math.random() < 0.3, // 30% chance a product is "NEW"
            rating: product.rating?.rate || 0,
            reviewCount: product.rating?.count || 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Please try again!");
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, { autoClose: 2000 });
  };

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p className="no-products">No products found in this category.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            {product.isNew && <span className="new-badge">NEW</span>}
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
              onClick={() => setSelectedProduct(product)}
            />
            <h3 className="product-name">{product.title}</h3>
            <p className="product-price">₹{product.price.toFixed(2)}</p>
            <div className="ratings">
              <span className="stars">{"⭐".repeat(Math.round(product.rating))}</span>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          closeModal={() => setSelectedProduct(null)}
          addToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default ProductList;
