import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const StreamingAnimeInfoCard = ({ anime, episodeNumber }) => {
    const [expanded, setExpanded] = useState(false);

    if (!anime) return null;

    return (
        <div className="mb-4 pt-3 px-1">
            {/* Episode label */}
            {episodeNumber && (
                <div className="mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary-400">
                        Episode {episodeNumber}
                    </span>
                </div>
            )}

            {/* Title */}
            <h2 className="text-base font-bold text-white mb-2 leading-snug">
                {anime.title}
            </h2>

            {/* Synopsis */}
            {anime.synopsis && (
                <div>
                    <p
                        className={`text-sm text-gray-400 leading-relaxed transition-all ${!expanded ? 'line-clamp-2' : ''}`}
                    >
                        {anime.synopsis}
                    </p>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-1 mt-1 text-xs text-primary-400 font-semibold"
                    >
                        {expanded ? <><ChevronUp size={12} /> Less</> : <><ChevronDown size={12} /> More</>}
                    </button>
                </div>
            )}
        </div>
    );
};

export default StreamingAnimeInfoCard;
