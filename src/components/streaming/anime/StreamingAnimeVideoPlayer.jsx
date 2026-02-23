import { forwardRef } from 'react';
import { MonitorPlay, Loader2 } from 'lucide-react';

const StreamingAnimeVideoPlayer = forwardRef(({
    selectedServer,
    isLoading,
    onLoad,
    onError
}, ref) => {
    return (
        <div className="w-full bg-black" style={{ aspectRatio: '16/9' }}>
            {!selectedServer ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-dark-card">
                    <div className="w-14 h-14 rounded-2xl bg-dark-surface flex items-center justify-center mb-3">
                        <MonitorPlay size={28} className="text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-500">No stream available</p>
                </div>
            ) : (
                <div className="relative w-full h-full">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card z-10">
                            <Loader2 size={32} className="text-primary-400 animate-spin mb-3" />
                            <p className="text-xs text-gray-500">Loading player...</p>
                        </div>
                    )}
                    <iframe
                        ref={ref}
                        src={selectedServer.url}
                        className="w-full h-full"
                        allowFullScreen
                        allow="autoplay; fullscreen; picture-in-picture"
                        frameBorder="0"
                        title={selectedServer.server}
                        onLoad={onLoad}
                        onError={onError}
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-top-navigation"
                    />
                </div>
            )}
        </div>
    );
});

StreamingAnimeVideoPlayer.displayName = 'StreamingAnimeVideoPlayer';
export default StreamingAnimeVideoPlayer;
