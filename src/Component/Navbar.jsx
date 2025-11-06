import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Providers/AuthContext';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const Links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                            : "text-gray-600"
                    }
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/allProducts"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                            : "text-gray-600"
                    }
                >
                    All Products
                </NavLink>
            </li>

            {user && (
                <>
                    <li>
                        <NavLink
                            to="/myProducts"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                                    : "text-gray-600"
                            }
                        >
                            My Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bids"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                                    : "text-gray-600"
                            }
                        >
                            My Bids
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/createAProduct"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                                    : "text-gray-600"
                            }
                        >
                            Create A Product
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );


    const handleLogout = () => {
        logOut()
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {Links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">smart deals</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {Links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <button onClick={handleLogout} className="btn bg-blue-600  rounded-lg shadow border-none text-white font-bold hover:bg-sky-500 transition-all duration-300">
                            Log Out
                        </button>
                    ) : (
                        <Link to='/auth/login' className='btn bg-blue-600  rounded-lg shadow border-none text-white font-bold hover:bg-sky-500 transition-all duration-300'>Login</Link>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Navbar;