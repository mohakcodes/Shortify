"use client"

import React, { useState } from 'react'
import axios from "axios"
import {CopyToClipboard} from "react-copy-to-clipboard"
import { useUserStore } from '../utils/store'
import {API_URL} from '../constants'

const Hero = () => {

  const [link, setLink] = useState("");
  const [shortId , setShortId] = useState();
  const [copied,setCopied] = useState(false);
  const {user} = useUserStore();

  const addLink = async() => {
    if(link === ""){
        alert("Link can't be Empty");
        return;
    }
    try {
        const res = await axios.post(`${API_URL}` , {
            url:link,
            user:user,
        })
        setShortId(res.data.id);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const changeFn = (e) => {
    setLink(e.target.value);
    setShortId();
  }

  const copyText = () => {
    setCopied(true);
    setTimeout(() => {
        setCopied(false);
      }, 2000);
  }

  return (
    <div>
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-10 lg:flex lg:h-[80vh] lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                    Shorten your URL
                    <br />
                    <strong className="font-extrabold text-red-700 sm:block"> In 1 Click. </strong>
                </h1>
                <hr className='border-1 border-gray-800'/>
                <p className="my-4 font-bold sm:text-xl/relaxed">
                    Paste the link here -
                </p>
                <div className='flex justify-between'>
                    <input 
                        type="text" 
                        className='w-[74%] p-4 bg-gray-200 text-black' 
                        placeholder='Add Link'
                        onChange={(e)=>changeFn(e)}
                    />
                    <button 
                        className='w-[25%] bg-blue-600 text-white sm:text-lg text-base'
                        onClick={()=>addLink()}
                    >
                        Short
                    </button>
                </div>
                {
                    shortId ? (
                        <div className='flex justify-between mt-3'>
                            <input 
                                type="text" 
                                className='w-[74%] p-4 bg-gray-200 text-black' 
                                value={`${API_URL}/${shortId}`}
                                readOnly
                            />
                            <CopyToClipboard text={`${API_URL}/${shortId}`} onCopy={copyText}>
                                <button 
                                    className={`w-[25%] ${copied ? 'bg-teal-400' : 'bg-teal-200'} text-black sm:text-lg text-base`}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </CopyToClipboard>
                        </div>
                    ) : null
                }
                </div>
            </div>
        </section>
    </div>
  )
}

export default Hero