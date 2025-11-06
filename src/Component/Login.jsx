import { Eye, EyeOff } from 'lucide-react';
import React, { use, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Providers/AuthContext';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')
    const { setUser, signInUser, googleSignIn } = use(AuthContext)
    const navigate = useNavigate()
    const emailRef = useRef()
    // console.log(location)

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then(result => {
                const loggedUser = (result.user)
                // added database server
                fetch('https://smart-deals-server-ten.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json' // Set the content type of the data being sent
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))


                navigate(`${location.state ? location.state : '/'}`)
                form.reset()
            })
            .catch(error => {
                if (error.code === "auth/user-not-found") {
                    setError("No account found with this email.");
                } else if (error.code === "auth/wrong-password") {
                    setError("Incorrect password. Please try again.");
                } else {
                    setError("Login failed. Please check your email and password.");
                }
            });

    }


    // Google sign-in
    const handleGoogleSignIn = (e) => {
        e.preventDefault()
        googleSignIn()
            .then(async (result) => {
                const loggedUser = result.user;

                const token = await loggedUser.getIdToken();

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
                    accessToken: token
                });
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch((error) => console.log(error.message));
    };


    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                        <h2 className="text-2xl font-bold text-center mb-4">Login to Your Account</h2>

                        <fieldset className="fieldset space-y-2">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Email"
                                name="email"
                                ref={emailRef}
                            />

                            <div className="relative">
                                <label className="label">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full"
                                    placeholder="Password"
                                    name="password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-7 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <div className="mt-2">
                                <Link> Forgot password </Link>

                            </div>

                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                            <button type='submit' className="btn btn-neutral w-full mt-4">Login</button>

                            <div className="divider">OR</div>

                            {/* Google */}
                            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </fieldset>

                        <p className="text-center mt-4">
                            Don't have an account?{" "}
                            <Link
                                to="/auth/signup"
                                className="text-secondary underline font-medium"
                            >
                                Sign Up
                            </Link>
                        </p>


                    </form>
                </div>
            </div>
        </div >
    );
};

export default Login;
