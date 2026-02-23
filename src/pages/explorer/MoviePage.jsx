// pages/explorer/MoviePage.jsx
import { useState, useEffect } from 'react';
import { Film, Star, Play, Loader2, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://anime-api-iota-beryl.vercel.app/api';

const MoviePage = ({ onAnimeSelect }) => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const fetchMovies = async (pageNum = 1, reset = true) => {
        if (reset) setLoading(true);
        else setLoadingMore(true);

        try {
            const res = await axios.get(`${API_BASE}/anime-movie?page=${pageNum}`);
            const data = res.data.data || res.data.anime || [];

            if (reset) {
                setMovies(data);
            } else {
                setMovies(prev => [...prev, ...data]);
            }

            // Jika data yang dikembalikan < 12 atau tidak ada nextPage, anggap sudah habis
            setHasMore(data.length >= 12 && res.data.nextPage !== null);
        } catch (error) {
            console.error('Error fetching movies:', error);
            if (reset) setMovies([]);
            setHasMore(false);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchMovies(1, true);
    }, []);

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchMovies(nextPage, false);
    };

    const handleMovieClick = (movie) => {
        if (onAnimeSelect) {
            onAnimeSelect(movie);
            return;
        }
        let itemUrl = movie.url;
        if (!itemUrl) return;
        itemUrl = itemUrl.replace(/\/+$/, '');
        const encodedUrl = encodeURIComponent(itemUrl);
        navigate(`/detail/anime/${encodedUrl}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchInput);
    };

    const clearSearch = () => {
        setSearchInput('');
        setSearch('');
    };

    // Filter lokal berdasarkan search
    const filteredMovies = search.trim()
        ? movies.filter(m =>
            m.title?.toLowerCase().includes(search.toLowerCase())
        )
        : movies;

    return (
        <div className="p-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <Film size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white">Anime Movies</h2>
                    <p className="text-xs text-gray-500">
                        {filteredMovies.length > 0
                            ? `${filteredMovies.length} movies found`
                            : 'Browse all anime movies'}
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative mb-5">
                <div className="flex items-center gap-2 bg-dark-surface border border-dark-border rounded-xl px-3 py-2.5 focus-within:border-primary-400 transition-colors">
                    <Search size={16} className="text-gray-500 shrink-0" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder="Search anime movies..."
                        className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                    />
                    {searchInput && (
                        <button type="button" onClick={clearSearch} className="text-gray-500 hover:text-white transition-colors">
                            <X size={16} />
                        </button>
                    )}
                </div>
            </form>

            {/* Loading Skeleton */}
            {loading ? (
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {[...Array(18)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="aspect-[3/4] rounded-[7px] bg-dark-card animate-pulse" />
                            <div className="h-4 w-3/4 bg-dark-card rounded animate-pulse" />
                            <div className="h-3 w-1/2 bg-dark-card rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            ) : filteredMovies.length > 0 ? (
                <>
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {filteredMovies.map((movie, index) => (
                            <div
                                key={index}
                                onClick={() => handleMovieClick(movie)}
                                className="group cursor-pointer"
                            >
                                {/* Poster */}
                                <div className="relative aspect-[3/4] rounded-[7px] overflow-hidden mb-2 bg-dark-card">
                                    <img
                                        src={movie.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(movie.title?.slice(0, 10))}&background=333&color=fff&size=400`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(movie.title?.slice(0, 10))}&background=333&color=fff&size=400`;
                                        }}
                                    />

                                    {/* Movie Badge */}
                                    <div className="absolute top-1.5 left-1.5">
                                        <span className="px-1.5 py-0.5 bg-red-500/90 text-white text-[9px] font-bold rounded">
                                            MOVIE
                                        </span>
                                    </div>

                                    {/* Score Badge */}
                                    {movie.score && movie.score !== 'N/A' && (
                                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded">
                                            <Star size={8} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-[10px] font-semibold text-white">
                                                {movie.score}
                                            </span>
                                        </div>
                                    )}

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                                        <div className="w-full flex justify-center mb-2">
                                            <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
                                                <Play size={14} className="text-black ml-0.5" fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-primary-300 transition-colors">
                                    {movie.title}
                                </h3>

                                {/* Meta */}
                                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                                    {movie.views && (
                                        <span>{movie.views.replace(' Views', '')}</span>
                                    )}
                                    {movie.genres && movie.genres.length > 0 && (
                                        <>
                                            {movie.views && <span className="w-0.5 h-0.5 bg-gray-600 rounded-full" />}
                                            <span className="truncate">{movie.genres[0]}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More - hanya tampil jika tidak ada search filter */}
                    {!search && hasMore && (
                        <button
                            onClick={loadMore}
                            disabled={loadingMore}
                            className="w-full mt-6 py-3 rounded-xl bg-dark-surface border border-dark-border text-sm text-gray-400 hover:text-white hover:border-primary-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loadingMore ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <span>Load More Movies</span>
                            )}
                        </button>
                    )}
                </>
            ) : (
                <div className="text-center py-16">
                    <Film size={40} className="text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-500 mb-1">
                        {search ? `No movies found for "${search}"` : 'No movies found'}
                    </p>
                    {search && (
                        <button onClick={clearSearch} className="text-primary-400 hover:underline text-sm mt-2">
                            Clear search
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MoviePage;
