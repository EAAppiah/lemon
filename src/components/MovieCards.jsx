'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaRegStar , FaClock  } from 'react-icons/fa6';

const MOVIES_DATA = {
  today: [
    { 
      id: 1, 
      title: 'Inception', 
      rating: 8.8, 
      duration: '2h 28m', 
      poster: '/api/placeholder/300/450' 
    },
    { 
      id: 2, 
      title: 'The Matrix', 
      rating: 8.7, 
      duration: '2h 16m', 
      poster: '/api/placeholder/300/450' 
    },
    { 
      id: 3, 
      title: 'Interstellar', 
      rating: 8.6, 
      duration: '2h 49m', 
      poster: '/api/placeholder/300/450' 
    }
  ],
  thisWeek: [
    { 
      id: 4, 
      title: 'Dune', 
      rating: 8.5, 
      duration: '2h 35m', 
      poster: '/api/placeholder/300/450' 
    },
    { 
      id: 5, 
      title: 'Blade Runner 2049', 
      rating: 8.4, 
      duration: '2h 44m', 
      poster: '/api/placeholder/300/450' 
    },
    { 
      id: 6, 
      title: 'Arrival', 
      rating: 8.3, 
      duration: '1h 56m', 
      poster: '/api/placeholder/300/450' 
    }
  ]
};

export default function MovieCards() {
  const [activeTab, setActiveTab] = useState('today');

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Trending Movies</h2>
      
      {/* Tab Buttons */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 inline-flex space-x-2">
          <button 
            onClick={() => setActiveTab('today')}
            className={`px-6 py-2 rounded-full transition ${
              activeTab === 'today' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Today
          </button>
          <button 
            onClick={() => setActiveTab('thisWeek')}
            className={`px-6 py-2 rounded-full transition ${
              activeTab === 'thisWeek' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOVIES_DATA[activeTab].map((movie) => (
          <div 
            key={movie.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            <div className="relative h-[450px]">
              <Image 
                src={movie.poster} 
                alt={movie.title} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaRegStar  className="text-yellow-500" fill="currentColor" size={20} />
                  <span>{movie.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock  className="text-gray-500" size={20} />
                  <span>{movie.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}