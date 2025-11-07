import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://smart-deals-server-mu.vercel.app/latest-product')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]); // ensure it's always an array
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!products.length) return <p className="text-center mt-8">No products found.</p>;

  return (
    <div>
      <h1 className="text-2xl text-center mt-8 mb-8">Latest Products</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map(product => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>

      <div className="flex justify-center mb-2">
        <Link
          to="/AllProducts"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Show All
        </Link>
      </div>

    </div>
  );
};

export default LatestProducts;
