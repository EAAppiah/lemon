import axios from 'axios';

// TypeScript interfaces
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: process.env.TMDB_API_KEY
  },
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'day'): Promise<Movie[]> {
  try {
    const response = await tmdbApi.get<MovieResponse>(`/trending/movie/${timeWindow}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

export async function getMovieDetails(movieId: number) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}