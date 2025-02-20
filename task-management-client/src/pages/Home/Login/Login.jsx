import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ToggleDarkMode from "../../../components/ToggleDarkMode";

const Login = () => {
    const { signInWIthGoogle, user, signOutUser } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWIthGoogle()
            .then(result => {
                console.log('Google Login user', result.user);
                toast.success('Login Successful.')
            })
            .catch(err => {
                console.log('');
                toast.error(`Login Failed, ${err}`)
            })
    }


    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <ToggleDarkMode />
            <div className="flex min-h-screen items-center justify-center ">

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                        {user ? "Welcome, " + user.displayName : "Sign in with Google"}
                    </h2>
                    {
                        user && <p className="text-gray-900 dark:text-white text-center my-8">Go to <Link to='/'>Task Management</Link></p>
                    }
                    <div className="flex justify-center mt-6">
                        {user ? (
                            <button
                                onClick={signOutUser}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={handleGoogleSignIn}
                                className="bg-cyan-600 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 48 48">
                                    <path fill="#FFFFFF" d="M24 9.5c3.9 0 7.1 1.3 9.7 3.9l7.3-7.3C36.7 2.5 30.7 0 24 0 14.9 0 7.1 5.2 2.9 12.9l8.2 6.4C13 13 18 9.5 24 9.5z"></path>
                                    <path fill="#FFFFFF" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.5c-.9 4.5-4 8.2-8.5 9.9l8.2 6.4c4.8-4.5 7.9-11.1 7.9-18.7z"></path>
                                    <path fill="#FFFFFF" d="M13 28.3c-1.1-3.3-1.1-6.9 0-10.2l-8.2-6.4C1.8 15 0 19.3 0 24s1.8 9 4.8 12.3l8.2-6.4z"></path>
                                    <path fill="#EA4335#FFFFFF" d="M24 48c6.5 0 12.6-2.3 17.2-6.2l-8.2-6.4c-2.5 1.7-5.5 2.7-9 2.7-6 0-11-3.8-12.9-9.1l-8.2 6.4C7.1 42.8 14.9 48 24 48z"></path>
                                </svg>
                                Sign in with Google
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;