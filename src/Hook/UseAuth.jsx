import React, { use } from 'react';
import { AuthContext } from '../Providers/AuthContext';

const UseAuth = () => {
   const userInfo = use(AuthContext)
   return userInfo
};

export default UseAuth;