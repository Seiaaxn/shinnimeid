// pages/explorer/GenrePage.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Play, Loader2, Star, ArrowLeft, ChevronLeft, ChevronRight,
    Wand2, Sword, Heart, Zap, Ghost, Laugh, Drama, Rocket,
    Target, Music, School, Skull, Coffee, Brain, Baby, Eye, Tv, Sparkles,
    Swords, Flame, Shield, Crown, Telescope, Dna, Microscope, BookOpen,
    Gamepad2, Car, Plane, MapPin, TreePine, Sunset, Moon
} from 'lucide-react';
import axios from 'axios';

const API_BASE = 'https://anime-api-iota-beryl.vercel.app/api';

// Daftar genre dari website asli
const GENRE_LIST = [
    { name: 'Action', value: 'action' },
    { name: 'Adventure', value: 'adventure' },
    { name: 'Comedy', value: 'comedy' },
    { name: 'Drama', value: 'drama' },
    { name: 'Ecchi', value: 'ecchi' },
    { name: 'Fantasy', value: 'fantasy' },
    { name: 'Game', value: 'game' },
    { name: 'Harem', value: 'harem' },
    { name: 'Historical', value: 'historical' },
    { name: 'Horror', value: 'horror' },
    { name: 'Isekai', value: 'isekai' },
    { name: 'Josei', value: 'josei' },
    { name: 'Kids', value: 'kids' },
    { name: 'Magic', value: 'magic' },
    { name: 'Martial Arts', value: 'martial-arts' },
    { name: 'Mecha', value: 'mecha' },
    { name: 'Military', value: 'military' },
    { name: 'Music', value: 'music' },
    { name: 'Mystery', value: 'mystery' },
    { name: 'Psychological', value: 'psychological' },
    { name: 'Reincarnation', value: 'reincarnation' },
    { name: 'Romance', value: 'romance' },
    { name: 'Samurai', value: 'samurai' },
    { name: 'School', value: 'school' },
    { name: 'Sci-Fi', value: 'sci-fi' },
    { name: 'Seinen', value: 'seinen' },
    { name: 'Shoujo', value: 'shoujo' },
    { name: 'Shounen', value: 'shounen' },
    { name: 'Slice of Life', value: 'slice-of-life' },
    { name: 'Space', value: 'space' },
    { name: 'Sports', value: 'sports' },
    { name: 'Super Power', value: 'super-power' },
    { name: 'Supernatural', value: 'supernatural' },
    { name: 'Thriller', value: 'thriller' },
    { name: 'Vampire', value: 'vampire' },
];

// Map icon berdasarkan nama genre
const getGenreIcon = (genreName) => {
    const iconMap = {
        'Action': Sword,
        'Adventure': Rocket,
        'Comedy': Laugh,
        'Drama': Drama,
        'Ecchi': Heart,
        'Fantasy': Wand2,
        'Game': Gamepad2,
        'Harem': Heart,
        'Historical': Crown,
        'Horror': Skull,
        'Isekai': Sparkles,
        'Josei': Heart,
        'Kids': Baby,
        'Magic': Wand2,
        'Martial Arts': Swords,
        'Mecha': Shield,
        'Military': Target,
        'Music': Music,
        'Mystery': Ghost,
        'Psychological': Brain,
        'Reincarnation': Sparkles,
        'Romance': Heart,
        'Samurai': Sword,
        'School': School,
        'Sci-Fi': Telescope,
        'Seinen': Brain,
        'Shoujo': Heart,
        'Shounen': Zap,
        'Slice of Life': Coffee,
        'Space': Telescope,
        'Sports': Target,
        'Super Power': Zap,
        'Supernatural': Ghost,
        'Thriller': Eye,
        'Vampire': Moon,
    };
    return iconMap[genreName] || Sparkles;
};

// Map gradient color berdasarkan nama genre
const getGenreColor = (genreName) => {
    const colorMap = {
        'Action': 'from-red-500 to-orange-500',
        'Adventure': 'from-blue-500 to-cyan-500',
        'Comedy': 'from-yellow-500 to-amber-500',
        'Drama': 'from-pink-500 to-rose-500',
        'Ecchi': 'from-pink-400 to-rose-400',
        'Fantasy': 'from-violet-500 to-purple-500',
        'Game': 'from-green-500 to-teal-500',
        'Harem': 'from-rose-400 to-pink-500',
        'Historical': 'from-amber-600 to-yellow-600',
        'Horror': 'from-gray-800 to-red-900',
        'Isekai': 'from-cyan-400 to-blue-500',
        'Josei': 'from-fuchsia-400 to-pink-400',
        'Kids': 'from-sky-400 to-blue-400',
        'Magic': 'from-purple-400 to-violet-500',
        'Martial Arts': 'from-red-600 to-orange-600',
        'Mecha': 'from-slate-500 to-gray-600',
        'Military': 'from-green-700 to-emerald-700',
        'Music': 'from-indigo-400 to-purple-400',
        'Mystery': 'from-purple-700 to-indigo-700',
        'Psychological': 'from-violet-700 to-indigo-600',
        'Reincarnation': 'from-purple-400 to-pink-400',
        'Romance': 'from-rose-500 to-pink-500',
        'Samurai': 'from-red-700 to-orange-700',
        'School': 'from-blue-400 to-cyan-400',
        'Sci-Fi': 'from-cyan-500 to-blue-600',
        'Seinen': 'from-gray-600 to-gray-700',
        'Shoujo': 'from-pink-400 to-rose-300',
        'Shounen': 'from-orange-500 to-yellow-500',
        'Slice of Life': 'from-green-400 to-emerald-400',
        'Space': 'from-indigo-600 to-violet-700',
        'Sports': 'from-orange-400 to-red-400',
        'Super Power': 'from-yellow-400 to-orange-400',
        'Supernatural': 'from-violet-600 to-purple-600',
        'Thriller': 'from-gray-700 to-red-800',
        'Vampire': 'from-red-900 to-purple-900',
    };
    return colorMap[genreName] || 'from-primary-400 to-primary-500';
};

const GenrePage = ({ onAnimeSelect }) => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    // State untuk UI
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Fetch semua anime saat halaman pertama kali dibuka (tanpa filter)
    useEffect(() => {
        const fetchAllAnime = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/anime/list?page=${page}`);
                setAnimeList(res.data.anime || []);
                setHasMore(res.data.nextPage !== null);
                setTotalResults(res.data.total || 0);
            } catch (error) {
                console.error('Error fetching anime:', error);
                setAnimeList([]);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        if (!selectedGenre) {
            fetchAllAnime();
        }
    }, [page, selectedGenre]);

    // Fetch anime berdasarkan genre yang dipilih
    const fetchAnimeByGenre = async (genre, resetPage = true) => {
        setLoading(true);
        setSelectedGenre(genre);

        try {
            const currentPage = resetPage ? 1 : page;
            const res = await axios.get(`${API_BASE}/anime/genre/${genre.value}?page=${currentPage}`);

            if (resetPage) {
                setAnimeList(res.data.anime || []);
                setPage(1);
            } else {
                setAnimeList(prev => [...prev, ...(res.data.anime || [])]);
            }

            setHasMore(res.data.nextPage !== null);
            setTotalResults(res.data.total || 0);
        } catch (error) {
            console.error('Error fetching anime by genre:', error);
            setAnimeList([]);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    // Reset filter (kembali ke semua anime)
    const resetFilter = () => {
        setSelectedGenre(null);
        setPage(1);
    };

    // Load more untuk pagination
    const loadMore = async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        const nextPage = page + 1;

        try {
            if (selectedGenre) {
                const res = await axios.get(`${API_BASE}/anime/genre/${selectedGenre.value}?page=${nextPage}`);
                setAnimeList(prev => [...prev, ...(res.data.anime || [])]);
                setHasMore(res.data.nextPage !== null);
            } else {
                const res = await axios.get(`${API_BASE}/anime/list?page=${nextPage}`);
                setAnimeList(prev => [...prev, ...(res.data.anime || [])]);
                setHasMore(res.data.nextPage !== null);
            }
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more:', error);
            setHasMore(false);
        } finally {
            setLoadingMore(false);
        }
    };

    // Scroll handlers
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScroll);
            checkScroll();
            return () => scrollContainer.removeEventListener('scroll', checkScroll);
        }
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-border">
                <div className="px-4 py-4 flex items-center gap-3">

                    {/* Title */}
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-white">
                            {selectedGenre ? `${selectedGenre.name} Anime` : "All Anime"}
                        </h2>
                    </div>

                    {/* Genre Dropdown */}
                    <div className="relative">
                        <select
                            value={selectedGenre?.value || ""}
                            onChange={(e) => {
                                const genre = GENRE_LIST.find(g => g.value === e.target.value);
                                if (genre) {
                                    fetchAnimeByGenre(genre);
                                } else {
                                    resetFilter();
                                }
                            }}
                            className="appearance-none bg-dark-surface border border-dark-border text-sm text-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                        >
                            <option value="">All</option>
                            {GENRE_LIST.map((genre) => (
                                <option key={genre.value} value={genre.value}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>

                        {/* Dropdown Icon */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            ▼
                        </div>
                    </div>

                </div>
            </div>

            {/* Anime Grid */}
            <div className="p-4 pt-3">
                {loading && page === 1 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {[...Array(30)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="aspect-[3/4] rounded-[7px] bg-dark-card animate-pulse" />
                                <div className="h-4 w-3/4 bg-dark-card rounded animate-pulse" />
                                <div className="h-3 w-1/2 bg-dark-card rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : animeList.length > 0 ? (
                    <>
                        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {animeList.map((anime, index) => (
                                <div
                                    key={index}
                                    onClick={() => onAnimeSelect(anime)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[3/4] rounded-[7px] overflow-hidden mb-2 bg-dark-card">
                                        <img
                                            src={anime.image || 'https://via.placeholder.com/300x400/1a1a1a/666666?text=No+Image'}
                                            alt={anime.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />

                                        {/* Score Badge */}
                                        {anime.score && anime.score !== 'N/A' && (
                                            <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded">
                                                <Star size={8} className="text-yellow-400 fill-yellow-400" />
                                                <span className="text-[10px] font-semibold text-white">
                                                    {anime.score}
                                                </span>
                                            </div>
                                        )}


                                    </div>

                                    <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-primary-300 transition-colors">
                                        {anime.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {anime.status?.replace('Completed', '') || anime.type?.replace('Completed', '') || 'TV'}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        {hasMore && (
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
                                    <span>Load More</span>
                                )}
                            </button>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-2">No anime found</p>
                        {selectedGenre && (
                            <button
                                onClick={resetFilter}
                                className="text-primary-400 hover:underline text-sm"
                            >
                                Show all anime
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenrePage;