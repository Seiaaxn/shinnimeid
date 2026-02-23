const AnimeTitleSection = ({ title, image, altTitles }) => {
    const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=1a1a1a&color=ffaf2f&size=200`;

    return (
        <div className="flex items-end gap-3 mb-5">
            <div className="w-[72px] h-[102px] rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.7)' }}>
                <img
                    src={image || fallbackImage}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = fallbackImage; }}
                />
            </div>
            <div className="flex-1 min-w-0 pb-1">
                <h1 className="text-xl font-bold text-white leading-tight mb-1 line-clamp-2">{title}</h1>
                {altTitles && altTitles.length > 0 && (
                    <p className="text-xs text-gray-500 line-clamp-1">{altTitles[0]}</p>
                )}
            </div>
        </div>
    );
};

export default AnimeTitleSection;
