
import ProductCard from '../Component/ProductCard';
import { useLoaderData } from 'react-router';

const AllProducts = () => {
  const products = useLoaderData(); // Expecting an array from backend
  if (!products || products.length === 0)
    return <p className="text-center mt-8">No products found.</p>;

  return (
    <div>
      <h1 className="text-2xl text-center mt-8 mb-8">All Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};


export default AllProducts;