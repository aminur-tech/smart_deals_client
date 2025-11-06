import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, Link} from "react-router";
import { AuthContext } from "../Providers/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const { _id: productId } = useLoaderData();
    const [bids, setBids] = useState([])
    const bidsModalRef = useRef()
    const { user } = useContext(AuthContext)


    useEffect(() => {
        fetch(`https://smart-deals-server-ten.vercel.app/products/bids/${productId}`,{
            headers:{
                authorized : `bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("bid data is", data)
                setBids(data)
            })

    }, [productId, user])

    const {
        image,
        title,
        condition,
        usage,
        description,
        category,
        price_min,
        price_max,
        _id,
        seller_image,
        seller_name,
        email,
        location,
        seller_contact,
        status,
    } = productId;

    const handleModalOpenBtn = () => {
        bidsModalRef.current.showModal()
    }

    const handleBidsSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const bid = e.target.bid.value
        console.log(productId, name, email, bid)
        const newBids = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid,
            status: 'pending'
        }
        fetch('https://smart-deals-server-ten.vercel.app/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBids)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    bidsModalRef.current.close()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your bids has been success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newBids._id = data.insertedId
                    const newBid = [...bids, newBids]
                    newBid.sort((a, b) => b.bid_price - a.bid_price)
                    setBids(newBid)
                }
            })

    }


    return (
        <div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-12">
                {/* Left: Image + Description */}
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-200 w-full h-96 rounded-xl flex items-center justify-center">
                        <img
                            src={image}
                            alt={title}
                            className="object-contain w-full h-full rounded-xl"
                        />
                    </div>

                    {/* Description below image */}
                    <div className="bg-white p-4 rounded-lg border">
                        <h2 className="font-semibold mb-2">Product Description</h2>
                        <p>
                            <span className="font-medium">Condition:</span> {condition}{" "}
                            <span className="ml-4 font-medium">Usage Time:</span> {usage}
                        </p>
                        <p className="mt-2 text-gray-600">{description}</p>
                    </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-between">
                    {/* Back & Title */}
                    <div>
                        <Link
                            to="/"
                            className="text-gray-500 hover:text-gray-800 flex items-center mb-2"
                        >
                            &larr; Back To Products
                        </Link>

                        <h1 className="text-2xl font-bold mb-2">{title}</h1>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                            {category}
                        </span>

                        <p className="text-green-600 font-semibold text-lg mt-4">
                            ${price_min} - ${price_max}
                        </p>
                        <p className="text-gray-500 text-sm">Price starts from</p>
                    </div>

                    {/* Seller Info */}
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                        <h2 className="font-semibold mb-2">Seller Information</h2>
                        <div className="flex items-center gap-3">
                            <img
                                src={seller_image || "https://via.placeholder.com/48"}
                                alt={seller_name || "Seller"}
                                className="w-12 h-12 rounded-full bg-gray-300"
                            />
                            <div>
                                <p className="font-medium">{seller_name || "Unknown"}</p>
                                <p className="text-sm text-gray-500">{email}</p>
                            </div>
                        </div>
                        <p className="text-sm mt-2">
                            <strong>Location:</strong> {location}
                        </p>
                        <p className="text-sm">
                            <strong>Contact:</strong> {seller_contact}
                        </p>
                        <p className="text-sm">
                            <strong>Status:</strong>{" "}
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${status === "sold"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {status === "sold" ? "Sold" : "On Sale"}
                            </span>
                        </p>
                    </div>

                    {/* Buy Button */}
                    <button onClick={handleModalOpenBtn} className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                        I Want Buy This Product
                    </button>

                    <dialog ref={bidsModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give Seller Your Offered Price</h3>

                            <form onSubmit={handleBidsSubmit}>
                                <fieldset className="fieldset">
                                    <label className="label">Buyer Name</label>
                                    <input type="text" name='name' className="input" readOnly defaultValue={user?.displayName || ''} />
                                    <label className="label">Buyer Email</label>
                                    <input type="email" className="input" name="email" readOnly defaultValue={user?.email || ''} />

                                    <label className="label">Place your Price</label>
                                    <input type="text" className="input" placeholder="Place your Price" name="bid" />

                                    <div className="flex justify-end gap-8 items-center">
                                        <button onClick={() => bidsModalRef.current.close()} method="dialog" className="btn modal-action">Cancel</button>

                                        <button className="btn bg-sky-600 text-white mt-4">Submit Bid</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>

            <div className="mt-16 mb-8">
                <h1 className="text-2xl font-bold ">Bids For This Products: <span className="text-sky-400">{bids.
                    length}</span></h1>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="w-[5%]">SL No</th>
                                <th className="w-[35%]">Product</th>
                                <th className="w-[25%]">Buyer</th>
                                <th className="w-[20%]">Bid Price</th>
                                <th className="w-[15%]">Actions</th>
                            </tr>

                        </thead>
                        <tbody>

                            {
                                bids.map((bid, index) => <tr key={index}>
                                    <th>{index + 1} </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.
                                                    buyer_name}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                       {bid.buyer_email}  
                                    </td>
                                    <td>{bid.bid_price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
