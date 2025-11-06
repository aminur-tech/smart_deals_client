import React, { use } from 'react';
import ProductCard from './ProductCard';

const LatestProducts = ({latestProductsPromises}) => {
    const products = use(latestProductsPromises)
    // console.log(products)

    return (
        <div>
            <h1 className='text-2xl text-center mt-8 mb-8'>Latest Product</h1>
           <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
             {
                products.map(product => <ProductCard product={product} key={product._id}></ProductCard>)
            }
           </div>
            
        </div>
    );
};

export default LatestProducts;