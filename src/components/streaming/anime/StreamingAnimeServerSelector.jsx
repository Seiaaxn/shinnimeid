import { useState, useEffect } from "react";
import {
    Monitor, Download, Share2, Flag,
    ThumbsUp, ThumbsDown, X, ExternalLink, ChevronRight
} from "lucide-react";

const StreamingAnimeServerSelector = ({ streams = [], selectedServer, downloads = [], onServerSelect }) => {
    const [sheet, setSheet] = useState(null); // 'quality' | 'download' | null
    const [animate, setAnimate] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        if (sheet) setTimeout(() => setAnimate(true), 10);
        else setAnimate(false);
    }, [sheet]);

    const close = () => { setAnimate(false); setTimeout(() => setSheet(null), 250); };

    const actions = [
        {
            icon: <ThumbsUp size={17} className={liked ? 'text-primary-400' : ''} />,
            label: liked ? 'Liked' : 'Like',
            active: liked,
            onClick: () => { setLiked(!liked); if (disliked) setDisliked(false); }
        },
        {
            icon: <ThumbsDown size={17} className={disliked ? 'text-primary-400' : ''} />,
            label: disliked ? 'Disliked' : 'Dislike',
            active: disliked,
            onClick: () => { setDisliked(!disliked); if (liked) setLiked(false); }
        },
        {
            icon: <Monitor size={17} />,
            label: selectedServer?.server || 'Quality',
            onClick: () => setSheet('quality')
        },
        {
            icon: <Download size={17} />,
            label: 'Download',
            onClick: () => setSheet('download')
        },
        {
            icon: <Share2 size={17} />,
            label: 'Share',
            onClick: () => navigator.share?.({ title: document.title, url: location.href })
        },
        {
            icon: <Flag size={17} />,
            label: 'Report',
            onClick: () => {}
        },
    ];

    return (
        <>
            {/* Action Pills */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 mb-4">
                {actions.map((action, i) => (
                    <button
                        key={i}
                        onClick={action.onClick}
                        className={`flex flex-col items-center gap-1 px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all active:scale-95 shrink-0 border ${
                            action.active
                                ? 'bg-primary-400/15 border-primary-400/40 text-primary-400'
                                : 'bg-dark-surface border-dark-border text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                    >
                        {action.icon}
                        <span className="text-[10px] font-semibold">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Bottom Sheet */}
            {sheet && (
                <div className="fixed inset-0 z-50 flex items-end">
                    <div
                        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-250 ${animate ? 'opacity-100' : 'opacity-0'}`}
                        onClick={close}
                    />
                    <div
                        className={`relative w-full bg-dark-surface rounded-t-3xl max-h-[80vh] overflow-y-auto transition-all duration-250 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                        style={{ boxShadow: '0 -4px 40px rgba(0,0,0,0.6)' }}
                    >
                        {/* Handle */}
                        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-5" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 mb-4">
                            <div className="flex items-center gap-2">
                                {sheet === 'quality' ? <Monitor size={18} className="text-primary-400" /> : <Download size={18} className="text-primary-400" />}
                                <h3 className="text-base font-bold text-white">
                                    {sheet === 'quality' ? 'Select Quality' : 'Download'}
                                </h3>
                            </div>
                            <button onClick={close} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15">
                                <X size={16} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="px-5 pb-8">
                            {/* Quality */}
                            {sheet === 'quality' && (
                                <div className="space-y-2">
                                    {streams.length === 0 ? (
                                        <p className="text-gray-500 text-sm text-center py-6">No streams available</p>
                                    ) : streams.map((server, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { onServerSelect(server); close(); }}
                                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all active:scale-[0.99] border ${
                                                selectedServer?.url === server.url
                                                    ? 'bg-primary-400/15 border-primary-400/40 text-white'
                                                    : 'bg-dark-card border-dark-border text-gray-300 hover:border-white/20'
                                            }`}
                                        >
                                            <span className="text-sm font-semibold">{server.server || `Server ${idx + 1}`}</span>
                                            {selectedServer?.url === server.url && (
                                                <span className="w-2 h-2 rounded-full bg-primary-400" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Download */}
                            {sheet === 'download' && (
                                <div className="space-y-4">
                                    {!downloads || downloads.length === 0 ? (
                                        <p className="text-gray-500 text-sm text-center py-6">No downloads available</p>
                                    ) : downloads.map((dl, idx) => (
                                        <div key={idx}>
                                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{dl.format}</p>
                                            <div className="space-y-2">
                                                {dl.qualities?.map((quality, qIdx) => (
                                                    <div key={qIdx} className="bg-dark-card rounded-xl border border-dark-border p-3">
                                                        <p className="text-xs font-bold text-primary-400 mb-2">{quality.quality}</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {quality.links?.map((link, lIdx) => (
                                                                <a
                                                                    key={lIdx}
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-surface rounded-lg text-xs text-gray-300 hover:text-primary-400 border border-dark-border hover:border-primary-400/40 transition-all"
                                                                >
                                                                    <ExternalLink size={11} />
                                                                    {link.name}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StreamingAnimeServerSelector;
                                        
