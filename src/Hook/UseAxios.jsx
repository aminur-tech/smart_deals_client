import axios from 'axios';
import React from 'react';

const Instance = axios.create({
    baseURL: 'https://smart-deals-server-ten.vercel.app'
})

const UseAxios = () => {
   return Instance
};

export default UseAxios;