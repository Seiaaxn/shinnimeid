import { ChevronLeft } from 'lucide-react';

const StreamingAnimeNavbar = ({ title, episodeTitle, episodeNumber, onBack }) => {
    return (
        <div className="sticky top-0 z-50 bg-dark-bg/90 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center h-14 px-3 gap-3">
                <button
                    onClick={onBack}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/15 transition-all active:scale-95 shrink-0"
                >
                    <ChevronLeft size={20} className="text-white" />
                </button>
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-primary-400 font-semibold truncate uppercase tracking-wide">
                        {episodeNumber ? `Episode ${episodeNumber}` : episodeTitle || ''}
                    </p>
                    <h1 className="text-sm font-bold text-white truncate leading-tight">
                        {title || 'Anime'}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default StreamingAnimeNavbar;
