import React from 'react';
import LatestProducts from '../Component/latestProducts';

const latestProductsPromises = fetch('https://smart-deals-server-ten.vercel.app/latest-product').then(res=> res.json())

const Home = () => {
    return (
        <div>
            <LatestProducts latestProductsPromises={latestProductsPromises}></LatestProducts>

        </div>
    );
};

export default Home;