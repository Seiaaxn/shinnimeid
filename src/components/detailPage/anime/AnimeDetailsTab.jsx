import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const InfoRow = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-center justify-between py-3 border-b border-dark-border last:border-0">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</span>
            <span className="text-sm text-white font-medium">{value}</span>
        </div>
    );
};

const AnimeDetailsTab = ({ description, status, type, totalEpisodes, released, genres = [] }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="space-y-5">
            {/* Synopsis */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Synopsis</h3>
                <div className="relative">
                    <p className={`text-sm text-gray-300 leading-relaxed text-justify transition-all ${!expanded ? 'line-clamp-4' : ''}`}>
                        {description || 'No synopsis available.'}
                    </p>
                    {description && description.length > 200 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1 mt-2 text-xs text-primary-400 font-semibold hover:text-primary-300 transition-colors"
                        >
                            {expanded ? (
                                <><ChevronUp size={14} /> Show Less</>
                            ) : (
                                <><ChevronDown size={14} /> Read More</>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Info */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Information</h3>
                <div className="bg-dark-surface rounded-xl border border-dark-border px-4 overflow-hidden">
                    <InfoRow label="Status" value={status} />
                    <InfoRow label="Type" value={type} />
                    {totalEpisodes > 0 && <InfoRow label="Episodes" value={totalEpisodes} />}
                    <InfoRow label="Released" value={released} />
                </div>
            </div>

            {/* Genres */}
            {genres.length > 0 && (
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-dark-surface rounded-lg text-xs text-gray-300 border border-dark-border font-medium"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnimeDetailsTab;
