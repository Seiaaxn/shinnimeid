import { ChevronLeft, Bookmark, Share2 } from 'lucide-react';

const AnimeHeader = ({ title, bookmarked, onGoBack, onBookmark, onShare }) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center justify-between px-4 h-14 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={onGoBack}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/15 transition-all active:scale-95 shrink-0"
                    >
                        <ChevronLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-sm font-semibold text-white truncate">{title}</h1>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={onBookmark}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/15 transition-all active:scale-95"
                    >
                        <Bookmark
                            size={18}
                            className={bookmarked ? 'fill-primary-400 text-primary-400' : 'text-gray-300'}
                        />
                    </button>
                    <button
                        onClick={onShare}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/15 transition-all active:scale-95"
                    >
                        <Share2 size={18} className="text-gray-300" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnimeHeader;
