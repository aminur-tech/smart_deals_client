import axios from 'axios';
import React, { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';


const Instance = axios.create({
    baseURL: 'https://smart-deals-server-mu.vercel.app'
})

const UseAxiosSecure = () => {
    const { user, logOut } = UseAuth()
    const navigate = useNavigate()
    // token 
    useEffect(() => {
        // request interceptors 
        const requestInterceptor = Instance.interceptors.request.use((config) => {
            // console.log(config)
            const token = user.accessToken
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        // response Interceptor 
        const responseInterceptor = Instance.interceptors.response.use((res) => {
            return res;
        },
            (err) => {
                const status = err.status
                if (status === 401 || status === 403) {
                    logOut()
                        .then(() => {
                            navigate('/auth/login')
                        })
                }

            })
        return () => {
            Instance.interceptors.request.eject(requestInterceptor),
            Instance.interceptors.response.eject(responseInterceptor);
        }
    }, [user, navigate, logOut])

    return Instance
};

export default UseAxiosSecure;