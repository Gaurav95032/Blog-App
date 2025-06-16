import authService from '@/appwrite/auth';
import { login as authLogin } from '@/store/authSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useForm } from 'react-hook-form';
import Input from './Input';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const onLogin = async (data) => {
        try {
            const userdata = await authService.login(data);
            if (userdata) {
                const currentUser = await authService.getCurrentUser();
                dispatch(authLogin({ userdata: currentUser }));
                navigate("/");
            }
        } catch (err) {
            setError(err.message || "Login failed. Please check your credentials.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <Logo />
                </div>
                <h1 className="text-2xl font-bold text-center mb-4">Login to MyBlog</h1>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                </p>
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: true })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
