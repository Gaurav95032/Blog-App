import React from 'react';
import authService from '@/appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';

function Logout() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            onClick={logoutHandler}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition duration-300"
        >
            Logout
        </button>
    );
}

export default Logout;
