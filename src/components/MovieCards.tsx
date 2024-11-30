'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegStar, FaClock, FaInfo } from 'react-icons/fa6';
import { getTrendingMovies, getMovieDetails, Movie } from '/src/library/tmdb.ts';

// Extended movie interface to include additional details
interface DetailedMovie extends Movie {
  overview: string;
  runtime: number;
  genres: { id: number; name: string }[];
}

export default function MovieCards() {
  const [activeTab, setActiveTab] = useState<'day' | 'week'>('day');
  const [movies, setMovies] = useState<DetailedMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<DetailedMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMoviesWithDetails() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch trending movies
        const trendingMovies = await getTrendingMovies(activeTab);
        
        // Fetch details for each movie
        const detailedMovies = await Promise.all(
          trendingMovies.map(async (movie) => {
            const details = await getMovieDetails(movie.id);
            return { ...movie, ...details };
          })
        );

        setMovies(detailedMovies);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setError('Failed to load movies. Please try again later.');
        setIsLoading(false);
      }
    }

    fetchMoviesWithDetails();
  }, [activeTab]);

  const formatDuration = (releaseDate: string) => {
    return new Date(releaseDate).getFullYear().toString();
  }

  const openMovieDetails = (movie: DetailedMovie) => {
    setSelectedMovie(movie);
  }

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Trending Movies</h2>
      
      {/* Tab Buttons */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 inline-flex space-x-2">
          <button 
            onClick={() => setActiveTab('day')}
            className={`px-6 py-2 rounded-full transition ${
              activeTab === 'day' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Today
          </button>
          <button 
            onClick={() => setActiveTab('week')}
            className={`px-6 py-2 rounded-full transition ${
              activeTab === 'week' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <p>Loading movies...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Movie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition duration-300 relative"
          >
            <div className="relative h-[450px]">
              <Image 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                fill 
                className="object-cover"
              />
              {/* Movie Details Button */}
              <button 
                onClick={() => openMovieDetails(movie)}
                className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <FaInfo />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaRegStar className="text-yellow-500" fill="currentColor" size={20} />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-gray-500" size={20} />
                  <span>{formatDuration(movie.release_date)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={closeMovieDetails}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div>
                <Image 
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} 
                  alt={selectedMovie.title}
                  width={500}
                  height={750}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
                <p className="mb-4">{selectedMovie.overview}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FaRegStar className="text-yellow-500" />
                    <span>Rating: {selectedMovie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-gray-500" />
                    <span>Release Year: {formatDuration(selectedMovie.release_date)}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Genres:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedMovie.genres.map((genre) => (
                        <span 
                          key={genre.id} 
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}