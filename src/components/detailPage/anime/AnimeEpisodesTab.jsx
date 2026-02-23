import { Play, ArrowUpDown, Clock } from 'lucide-react';
import { useState } from 'react';

const AnimeEpisodesTab = ({ episodes = [], onEpisodeSelect }) => {
    const [sortOrder, setSortOrder] = useState('latest');

    const sortedEpisodes = [...episodes].sort((a, b) => {
        const numA = a.number || a.episode || 0;
        const numB = b.number || b.episode || 0;
        return sortOrder === 'latest' ? numB - numA : numA - numB;
    });

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{episodes.length} episodes total</span>
                <button
                    onClick={() => setSortOrder(s => s === 'latest' ? 'oldest' : 'latest')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border text-xs text-gray-400 hover:text-white hover:border-primary-400/40 transition-all active:scale-95"
                >
                    <ArrowUpDown size={12} />
                    {sortOrder === 'latest' ? 'Latest' : 'Oldest'}
                </button>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-0.5 episode-scroll">
                {sortedEpisodes.map((episode, index) => {
                    const episodeNumber = episode.number || episode.episode || (episode.title?.match(/\d+/) || [index + 1])[0];
                    const episodeTitle = episode.title || `Episode ${episodeNumber}`;
                    const episodeDate = episode.date || '';

                    return (
                        <button
                            key={index}
                            onClick={() => onEpisodeSelect(episode)}
                            className="w-full group flex items-center gap-3 p-3.5 bg-dark-surface rounded-xl border border-dark-border hover:border-primary-400/40 hover:bg-dark-card active:scale-[0.99] transition-all duration-150"
                        >
                            {/* Number circle */}
                            <div className="w-10 h-10 rounded-lg bg-dark-card group-hover:bg-primary-400/15 flex items-center justify-center shrink-0 transition-colors border border-dark-border group-hover:border-primary-400/30">
                                <span className="text-sm font-bold text-gray-400 group-hover:text-primary-400 transition-colors">
                                    {episodeNumber}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-left min-w-0">
                                <p className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors truncate">
                                    {episodeTitle}
                                </p>
                                {episodeDate && (
                                    <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                                        <Clock size={10} />
                                        {episodeDate}
                                    </p>
                                )}
                            </div>

                            {/* Play icon */}
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent group-hover:bg-primary-400/20 transition-all shrink-0">
                                <Play size={14} className="text-gray-600 group-hover:text-primary-400 transition-colors ml-0.5" fill="currentColor" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AnimeEpisodesTab;
