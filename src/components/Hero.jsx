import Image from "next/image";
import { FaSearch  } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <div className="relative h-[45vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image 
        src="/images/avs.jpg"
        alt="Movie Background"
        fill 
        className="absolute inset-0 object-cover opacity-90"
      />

      {/* Overlay Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full text-center text-white">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Explore Cinematic Worlds
        </h1>
        
        <p className="text-xl mb-10 max-w-2xl mx-auto drop-shadow-md">
          Discover thousands of movies, from timeless classics to the latest blockbusters.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto w-full relative">
          <input 
            type="text" 
            placeholder="Search movies, genres, actors..." 
            className="w-full px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
            <FaSearch size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}