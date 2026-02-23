import { Play, Bookmark } from 'lucide-react';

const AnimeActionButtons = ({ onWatchNow, onBookmark, bookmarked }) => {
    return (
        <div className="flex gap-2.5 mb-5">
            <button
                onClick={onWatchNow}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-black transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #ffc05f 0%, #ffaf2f 100%)', boxShadow: '0 4px 20px rgba(255,175,47,0.35)' }}
            >
                <Play size={17} fill="currentColor" />
                <span>Watch Now</span>
            </button>
            <button
                onClick={onBookmark}
                className={`w-12 flex items-center justify-center rounded-xl border transition-all active:scale-95 ${bookmarked
                    ? 'bg-primary-400/20 border-primary-400/50'
                    : 'bg-dark-surface border-dark-border hover:border-primary-400/40'
                    }`}
            >
                <Bookmark
                    size={18}
                    className={bookmarked ? 'fill-primary-400 text-primary-400' : 'text-gray-400'}
                />
            </button>
        </div>
    );
};

export default AnimeActionButtons;
