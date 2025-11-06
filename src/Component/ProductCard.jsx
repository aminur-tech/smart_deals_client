import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-2xl p-3 shadow-sm hover:shadow-md transition duration-200">
      {/* Image */}
     
        <img src= {product.image} className="w-full h-50 rounded-xl mb-3"/>
     

      {/* Title */}
      <h3 className="font-medium text-gray-800 mb-1">
        {product.title}
      </h3>

      {/* Price Range */}
      <p className="text-purple-600 font-semibold mb-3">
        ${product.price_min} - {product.price_max}
      </p>

      {/* Button */}
       <Link
        to={`/productDetails/${product._id}`}
        className="block text-center border border-purple-500 text-purple-600 font-medium py-2 rounded-lg hover:bg-purple-500 hover:text-white transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
