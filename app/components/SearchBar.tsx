'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
    const router = useRouter();
    const [location, setLocation] = useState('');
    return (
        <div className='text-left py-3 m-auto flex justify-center'>
            <input
                className='rounded text-lg mr-3 p-2 w-[450px]'
                type="text"
                placeholder='state, city or town'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button
                className='bg-red-600 px-9 py-2 text-white rounded'
                onClick={() => {
                    if (location === "") return;
                    router.push(`/search?city=${location}`)
                    setLocation('')
                }}
            >
                Let's Go</button>
        </div>
    )
}
export default SearchBar;