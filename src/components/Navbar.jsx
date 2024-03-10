"use client"

import React, { useEffect, useState } from 'react';
import { useUserStore } from '../utils/store';
import axios from 'axios';
import { API_AUTH } from '../constants';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get(`${API_AUTH}/refresh`, { withCredentials: true });
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const username = user?.username;

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_AUTH}/logout`, {
        withCredentials: true,
      });
      console.log(res);
      setUser(null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div className='text-2xl font-bold'>Loading...</div>;
  }

  return (
    <div className='bg-teal-100'>
        <header>
            <div className="mx-auto max-w-screen-xl px-4 sm:py-4 py-6 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">                  
                    <h1 className="text-2xl font-bold text-red-700 sm:text-2xl">{`Shortify`}</h1>
                    <h1 className="text-xl font-bold text-gray-900 sm:text-xl">{`${username !== undefined ? 'Welcome '+username : ''}`}</h1>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                    {
                        user !== null ? (
                        <button
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-300 border border-gray-900 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                            type="button"
                            onClick={()=>router.push('/all-links')}
                        >
                            <span className="text-sm text-black font-medium"> My Links </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="black"
                                strokeWidth="2"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </button>
                        ):(
                            null
                        )
                    }

                    {
                        user !== null ? (
                            <button
                            className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                            type="button"
                            onClick={()=>handleLogout()}
                            >
                                Logout
                            </button>
                        ):(
                            <button
                            className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                            type="button"
                            >
                                <Link href="/login">Login</Link>
                            </button>
                        )
                    }
                </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Navbar