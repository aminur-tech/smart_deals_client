
import React from 'react';
import UseAuth from '../Hook/UseAuth';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
// import UseAxios from '../Hook/UseAxios';

const CreateAProduct = () => {
    const {user} = UseAuth()
    // const Instance = UseAxios()
    const axiosSecure = UseAxiosSecure()

    const handleCreateProduct = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const Image = e.target.Image.value
        const min_price = e.target.min_price.value
        const max_price = e.target.max_price.value
        console.log(title, Image, min_price, max_price, 
            
         )


        const newProduct = {title, Image, min_price, max_price,
            email : user.email, 
            name : user.displayName

        }

        // axios.post('http://localhost:3000/products', newProduct)
        // .then(data => console.log(data.data))

        // Instance.post('/products', newProduct)
        // .then(data => console.log(data.data))

        axiosSecure.post('/products', newProduct)
        .then(data => console.log(data.data))

    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-50">
            <form onSubmit={handleCreateProduct} className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <fieldset className="fieldset space-y-4">
                    <label className="label font-semibold">Title</label>
                    <input type="text" name="title" className="input input-bordered w-full" />

                    <label className="label font-semibold">Image URL</label>
                    <input type="text" className="input input-bordered w-full" name="Image" />

                    <label className="label font-semibold">Min Price</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Place your min_price"
                        name="min_price"
                    />

                    <label className="label font-semibold">Max Price</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Place your max_price"
                        name="max_price"
                    />

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" className="btn btn-outline">
                            Cancel
                        </button>
                        <button className="btn bg-sky-600 text-white">
                            create product
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>

    );
};

export default CreateAProduct;