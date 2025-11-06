import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthContext';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../Hook/UseAxiosSecure';

const MyBids = () => {
    const { user } = useContext(AuthContext)
    const [bids, setBids] = useState([])
    const axiosSecure = UseAxiosSecure()

 console.log(user)
    // firebase token 
    useEffect(() => {
        axiosSecure.get(`/bids?buyer_email=${user.email}`)
            .then(res => {
                console.log(res)
                setBids(res.data)
            })

    }, [axiosSecure, user.email])

    const handleRemoveBids = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bids/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });
                            const remainingBids = bids.filter(bid => bid._id !== _id)
                            setBids(remainingBids)
                        }
                    })

            }
        });


    }
    return (
        <div>
            <h3>my bids : {bids.length}</h3>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="w-[5%]">SL No</th>
                            <th className="w-[35%]">Product</th>
                            <th className="w-[25%]">Buyer</th>
                            <th className="w-[15%]">Bid Price</th>
                            <th className="w-[5%]">Status</th>
                            <th className="w-[15%]">Actions</th>
                        </tr>

                    </thead>
                    <tbody>

                        {
                            bids.map((bid, index) => <tr key={index}>
                                <td>{index + 1} </td>
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
                                <td>
                                    <div className="badge badge-warning">{bid.status}</div>
                                </td>

                                <td>
                                    <button onClick={() => handleRemoveBids(bid._id)} className="btn btn-outline btn-xs text-red-500">Remove Bids</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;