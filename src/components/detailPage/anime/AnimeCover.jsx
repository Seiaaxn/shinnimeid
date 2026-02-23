const AnimeCover = ({ image, title, category }) => {
    const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=1a1a1a&color=ffaf2f&size=600`;

    return (
        <div className="relative w-full h-[55vw] max-h-[340px] min-h-[220px] overflow-hidden">
            {/* Blurred background */}
            <div
                className="absolute inset-0 scale-110"
                style={{
                    backgroundImage: `url(${image || fallbackImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(18px) brightness(0.35)',
                }}
            />
            {/* Poster centered */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={image || fallbackImage}
                    alt={title}
                    className="h-full object-contain drop-shadow-2xl"
                    onError={(e) => { e.target.src = fallbackImage; }}
                />
            </div>
            {/* Gradient bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/30 to-dark-bg/10" />
            {/* Category badge */}
            <div className="absolute bottom-4 left-4">
                <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-primary-400 text-black rounded-md">
                    {category}
                </span>
            </div>
        </div>
    );
};

export default AnimeCover;
