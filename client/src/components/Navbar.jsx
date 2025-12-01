import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import api from '../configs/api';
import toast from 'react-hot-toast';
import { logout } from "../app/features/authSlice";

const Navbar = () => {

    const { user, token } = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const navigate = useNavigate()

    // const logoutUser = () => {
    //     navigate('/')
    //     dispatch(logout())
    // }

    const handleLogout = async () => {
        try {
            const res = await api.get(
                "/api/users/logout",
                {
                    headers: {
                        Authorization: token,
                        // Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                dispatch(logout());
                toast.success(res.data.message);
                navigate("/");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
            dispatch(logout());
            toast.error("Something went wrong");
            navigate('/')
        }
    };


    return (
        <div className='shadow bg-white'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
                <Link to="/">
                    {/* <img src="/logo.svg" alt="logo" className="h-11 w-auto" /> */}
                    <h1
                            className="text-3xl font-bold flex items-center gap-1"
                        >
                            <span className="text-gray-900">Novalume</span>
                            <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                        </h1>
                </Link>
                <div className='flex items-center gap-4'>
                    <p className='max-sm:hidden'>Hi, {user?.name}</p>
                    <button
                        onClick={handleLogout}
                        className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar