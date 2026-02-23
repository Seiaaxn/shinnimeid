import { useState, useMemo, useEffect } from "react";
import { ThumbsUp, Send, ArrowUpDown, MessageCircle } from "lucide-react";
import commentsData from "../../../data/comments.json";

const StreamingAnimeCommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [sortNewest, setSortNewest] = useState(true);

    useEffect(() => {
        const shuffled = [...commentsData].sort(() => Math.random() - 0.5);
        const count = Math.floor(Math.random() * (shuffled.length - 3 + 1)) + 3;
        setComments(shuffled.slice(0, count).map(c => ({
            ...c,
            createdAt: new Date(c.createdAt.endsWith("Z") ? c.createdAt : c.createdAt + "Z")
        })));
    }, []);

    const timeAgo = (date) => {
        const diff = Date.now() - date.getTime();
        if (isNaN(diff)) return "Unknown";
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    const sortedComments = useMemo(() =>
        [...comments].sort((a, b) => sortNewest ? b.createdAt - a.createdAt : a.createdAt - b.createdAt),
        [comments, sortNewest]
    );

    const handleAdd = () => {
        if (!newComment.trim()) return;
        setComments(prev => [{
            id: Date.now(), name: "You", comment: newComment,
            createdAt: new Date(), likes: 0
        }, ...prev]);
        setNewComment("");
    };

    const handleLike = (id) => {
        setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
    };

    const avatarColors = [
        'from-violet-500 to-purple-600',
        'from-blue-500 to-cyan-600',
        'from-rose-500 to-pink-600',
        'from-amber-500 to-orange-600',
        'from-emerald-500 to-teal-600',
        'from-primary-300 to-primary-400',
    ];

    const getColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

    return (
        <div className="mb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-gray-500" />
                    <h3 className="text-sm font-bold text-white">
                        Comments <span className="text-gray-600 font-normal">({comments.length})</span>
                    </h3>
                </div>
                <button
                    onClick={() => setSortNewest(!sortNewest)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-surface border border-dark-border hover:border-white/20 transition-all active:scale-95"
                >
                    <ArrowUpDown size={14} className="text-gray-400" />
                </button>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2.5 mb-5 bg-dark-surface border border-dark-border rounded-2xl px-4 py-2 focus-within:border-primary-400/50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-300 to-primary-400 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-black">Y</span>
                </div>
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                />
                <button
                    onClick={handleAdd}
                    disabled={!newComment.trim()}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary-400 text-black hover:opacity-90 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                >
                    <Send size={14} />
                </button>
            </div>

            {/* Comment List */}
            <div className="space-y-5">
                {sortedComments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                        {/* Avatar */}
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getColor(c.name)} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                            {c.name?.charAt(0).toUpperCase()}
                        </div>

                        {/* Body */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-semibold text-white">{c.name}</p>
                                <span className="text-[11px] text-gray-600">{timeAgo(c.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{c.comment}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <button
                                    onClick={() => handleLike(c.id)}
                                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-400 transition-colors active:scale-95"
                                >
                                    <ThumbsUp size={13} />
                                    <span>{c.likes}</span>
                                </button>
                                <button className="text-xs text-gray-500 hover:text-white transition-colors">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StreamingAnimeCommentsSection;
