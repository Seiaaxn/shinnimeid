import { ChevronLeft } from 'lucide-react';

const AnimeLoadingState = ({ onGoBack }) => {
    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Navbar skeleton */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center px-4 h-14 gap-3">
                    <button onClick={onGoBack} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8">
                        <ChevronLeft size={20} className="text-white" />
                    </button>
                    <div className="h-4 w-40 bg-dark-surface rounded-lg animate-pulse" />
                </div>
            </div>

            {/* Cover skeleton */}
            <div className="relative w-full h-[55vw] max-h-[340px] min-h-[220px] bg-dark-surface animate-pulse mt-14" />

            <div className="px-4 -mt-8 relative z-10">
                <div className="flex items-end gap-3 mb-5">
                    <div className="w-[72px] h-[102px] rounded-xl bg-dark-card animate-pulse" />
                    <div className="flex-1 space-y-2 pb-1">
                        <div className="h-5 w-4/5 bg-dark-card rounded animate-pulse" />
                        <div className="h-4 w-3/5 bg-dark-card rounded animate-pulse" />
                        <div className="h-3 w-2/5 bg-dark-card rounded animate-pulse" />
                    </div>
                </div>
                <div className="flex gap-2 mb-5">
                    <div className="flex-1 h-12 rounded-xl bg-dark-card animate-pulse" />
                    <div className="w-12 h-12 rounded-xl bg-dark-surface animate-pulse" />
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-7 w-20 bg-dark-surface rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnimeLoadingState;
