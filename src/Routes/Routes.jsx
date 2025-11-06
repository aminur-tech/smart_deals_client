import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout"
import Login from "../Component/Login";
import SignUp from "../Component/SignUp"
import HomeLayout from "../Layouts/HomeLayout";
import ProductDetails from "../Component/ProductDetails";
import MyBids from "../Component/MyBids";
import PrivateRoutes from "./PrivateRoutes";
import CreateAProduct from "../Component/CreateAProduct";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [{
            index: true,
            path: '/',
            Component: Home
        },
        {
            path: "productDetails/:id",
            loader: ({ params }) => fetch(`https://smart-deals-server-ten.vercel.app/products/${params.id}`),
            element: <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>
        },

        {
            path: '/bids',
            element: <PrivateRoutes><MyBids></MyBids></PrivateRoutes>
        },
        {
            path: '/createAProduct',
            element: <PrivateRoutes><CreateAProduct></CreateAProduct></PrivateRoutes>
        }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/signup",
                Component: SignUp
            },
        ],
    },
])