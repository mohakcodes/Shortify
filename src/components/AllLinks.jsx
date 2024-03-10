"use client"

import React, { useEffect, useState } from 'react'
import { useUserStore } from '../utils/store'
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {API_URL} from '../constants'

const AllLinks = () => {

  const [userLinks, setUserLinks] = useState([]);
  const [linkCopied, setLinkCopied] = useState([]);
  const {user} = useUserStore();

  const fetchUserLinks = async () => {
    try {
      const response = await axios.post(`${API_URL}/history`, {
        user: user,
      });
      setUserLinks(response.data.userLinks);
    } catch (error) {
      console.error(error);
    }
  };

  const copyText = (linkid) => {
    setLinkCopied((prev)=>({
      ...prev,
      [linkid]:true,
    }));
    setTimeout(()=>{
      setLinkCopied((prev)=>({
        ...prev,
        [linkid]:false,
      }));
    },2000);
  }

  useEffect(() => {
    fetchUserLinks();
  }, [user]);

  return (
    <div className='mx-auto text-center'>
      <div className='flex mx-auto text-center justify-around p-2'>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Links</h2>
        <a className="text-xl font-semibold text-gray-800 mb-4 bg-gray-300 py-1 px-3 rounded-lg" href='/'>Go Back</a>
      </div>
      <ul className='mx-auto text-center'>
        {userLinks.map((link) => (
          <div className='w-[75%] mx-auto text-center' key={link._id}>
            <article className="rounded-lg border border-gray-300 p-3 my-2">

              <p className="text-[12px] sm:text-[15px] text-gray-500 mb-2 overflow-hidden overflow-ellipsis">{link.longUrl}</p>
              <p className="text-[12px] sm:text-[18px] font-medium text-gray-900 mb-2 overflow-hidden overflow-ellipsis">{`Short URL: ${API_URL}/${link.shortId}`}</p>

              <CopyToClipboard text={`${API_URL}/${link.shortId}`} onCopy={()=>copyText(link._id)}>
                <button className="bg-green-500 text-white py-2 px-4 rounded-md">
                  {linkCopied[link._id] ? "Copied" : "Copy Link"}
                </button>
              </CopyToClipboard>

            </article>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AllLinks