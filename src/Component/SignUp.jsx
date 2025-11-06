import { Eye, EyeOff } from 'lucide-react';
import React, { useState, useContext } from 'react';

import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Providers/AuthContext';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [termError, setTermError] = useState('')
    const { setUser, createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const Navigate = useNavigate()
    const location = useLocation()
    // console.log(location)

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const terms = form.terms.checked
        // console.log(name, photo, email, password)

        if (name.length < 5) {
            setNameError('name should be 5 cheater')
            return
        }
        else {
            setNameError('')
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!emailRegex.test(email)) {
            setEmailError('please provide valid email address')
            return;
        }

        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 6 characters long and include uppercase, lowercase, number, and special character')
            return;
        }
        if (!terms) {
            setTermError('please accept our terms and condition')
            return
        }




        createUser(email, password)
            .then(result => {
                const user = result.user
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        // added data to database server
                        fetch('https://smart-deals-server-ten.vercel.app/users', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json' // Set the content type of the data being sent
                            },
                            body: JSON.stringify(user)
                        })
                            .then(res => res.json())
                            .then(data => console.log(data))

                        setUser({ ...user, displayName: name, photoURL: photo }),
                            Navigate('/')

                    })
                    .catch((error) => {
                        console.log(error)
                        setUser(user)
                    })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setEmailError('This email is already in use. Please use another one.');
                } else if (error.code === 'auth/invalid-email') {
                    setEmailError('Please provide a valid email address.');
                } else {
                    setEmailError(error.message);
                }
            });
    };

    // Google sign-in
    const handleGoogleSignIn = (e) => {
        e.preventDefault()
        googleSignIn()
            .then(async(result) => {
                const loggedUser = result.user;
                // console.log(loggedUser)

                const token =await loggedUser.getIdToken()

                fetch('https://smart-deals-server-ten.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json' // Set the content type of the data being sent
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                    
                setUser({
                    displayName: loggedUser.displayName,
                    email: loggedUser.email,
                    photoURL: loggedUser.photoURL,
                    accessToken : token
                });
                Navigate(`${location.state ? location.state : '/'}`)
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSignUp}>
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Sign Up your account
                        </h2>

                        <fieldset className="fieldset space-y-2">
                            {/* Name */}
                            <label className="label">Your Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Your Name"
                                name="name"
                                required
                            />
                            {
                                nameError && <p className='text-secondary'>{nameError}</p>
                            }

                            {/* Photo URL */}
                            <label className="label">Photo URL</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Photo URL"
                                name="photo"
                                required
                            />

                            {/* Email */}
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Email"
                                name="email"
                                required
                            />
                            {
                                emailError && <p className='text-secondary'>{emailError}</p>
                            }


                            {/* Password */}
                            <div className="relative">
                                <label className="label">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full"
                                    placeholder="Password"
                                    name="password"
                                    required
                                />
                                {
                                    passwordError && <p className='text-secondary'>{passwordError}</p>
                                }

                                <button
                                    type="button"
                                    className="absolute right-3 top-7 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox" name="terms" />
                                    <span className="ml-2">Accept Our Terms and Conditions</span>

                                </label>
                                {
                                    termError && <p className='text-secondary'>{termError}</p>

                                }
                            </div>

                            {/* sign up */}
                            <button className="btn btn-neutral w-full mt-4" type="submit">
                                Sign Up
                            </button>

                            <div className="divider">OR</div>

                            {/* Google */}
                            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>

                        </fieldset>

                        <p className="text-center mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/auth/login"
                                className="text-secondary underline font-medium"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
