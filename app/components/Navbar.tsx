"use client";

import Link from 'next/link';
import LoginModal from './LoginModal';
import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthContext';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { data, loading } = useContext(AuthenticationContext);
    const { logout } = useAuth();
    return (
        <nav className='bg-white p-2 flex justify-between'>
            <Link href='/' className='font-bold text-gray=700 text-2xl'>
                OpenTable{" "}
            </Link>
            <div>
                {
                    loading ? null :
                        <div className='flex'>
                            {
                                data ? <button className='bg-blue-400 text-white border p-1 px-4 rounded' onClick={logout}>Logout</button>
                                    : (
                                        <>
                                            <LoginModal isSignin={true} />
                                            <LoginModal isSignin={false} />
                                        </>
                                    )
                            }
                        </div>
                }
            </div>
        </nav>
    )
}
export default Navbar;