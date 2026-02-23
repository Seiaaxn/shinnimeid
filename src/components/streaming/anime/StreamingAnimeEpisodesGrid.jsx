import { useState, useEffect, useRef, useMemo } from "react";
import { LayoutGrid, List } from "lucide-react";

const StreamingAnimeEpisodesGrid = ({ episodes = [], currentEpisodeNumber, onEpisodeClick }) => {
    const [viewMode, setViewMode] = useState("horizontal");
    const scrollRef = useRef(null);

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "2-digit" });
    };

    // Auto scroll to active episode
    useEffect(() => {
        if (viewMode !== "horizontal") return;
        const active = scrollRef.current?.querySelector('[data-active="true"]');
        if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, [currentEpisodeNumber, viewMode]);

    if (!episodes || episodes.length === 0) return null;

    return (
        <div className="mb-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white">
                    Episodes <span className="text-gray-600 font-normal">({episodes.length})</span>
                </h3>
                <button
                    onClick={() => setViewMode(v => v === "horizontal" ? "grid" : "horizontal")}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-surface border border-dark-border hover:border-white/20 transition-all active:scale-95"
                >
                    {viewMode === "horizontal"
                        ? <LayoutGrid size={15} className="text-gray-400" />
                        : <List size={15} className="text-gray-400" />
                    }
                </button>
            </div>

            {/* Horizontal Scroll */}
            {viewMode === "horizontal" && (
                <div ref={scrollRef} className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {episodes.map((ep, idx) => {
                        const epNum = ep.number || idx + 1;
                        const isCurrent = epNum === currentEpisodeNumber;
                        return (
                            <button
                                key={idx}
                                data-active={isCurrent}
                                onClick={() => onEpisodeClick(ep)}
                                className={`shrink-0 min-w-[80px] px-3 py-2.5 rounded-xl text-left transition-all active:scale-95 border ${
                                    isCurrent
                                        ? "bg-primary-400/15 border-primary-400/50"
                                        : "bg-dark-surface border-dark-border hover:border-white/20 hover:bg-dark-card"
                                }`}
                            >
                                <p className={`text-xs font-bold ${isCurrent ? "text-primary-400" : "text-gray-300"}`}>
                                    Ep {epNum}
                                </p>
                                {ep.date && (
                                    <p className="text-[10px] text-gray-600 mt-0.5">{formatDate(ep.date)}</p>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Grid */}
            {viewMode === "grid" && (
                <div className="grid grid-cols-4 gap-2">
                    {episodes.map((ep, idx) => {
                        const epNum = ep.number || idx + 1;
                        const isCurrent = epNum === currentEpisodeNumber;
                        return (
                            <button
                                key={idx}
                                onClick={() => onEpisodeClick(ep)}
                                className={`py-2.5 px-2 rounded-xl text-center transition-all active:scale-95 border ${
                                    isCurrent
                                        ? "bg-primary-400/15 border-primary-400/50"
                                        : "bg-dark-surface border-dark-border hover:border-white/20"
                                }`}
                            >
                                <p className={`text-xs font-bold ${isCurrent ? "text-primary-400" : "text-gray-300"}`}>
                                    {epNum}
                                </p>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StreamingAnimeEpisodesGrid;
