const AnimeTabs = ({ activeTab, onTabChange, episodeCount }) => {
    const tabs = [
        { id: 'episodes', label: `Episodes`, count: episodeCount },
        { id: 'details', label: 'Details', count: null },
    ];

    return (
        <div className="flex gap-1 p-1 bg-dark-surface rounded-xl mb-5 border border-dark-border">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        activeTab === tab.id
                            ? 'bg-primary-400 text-black shadow-md'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            activeTab === tab.id ? 'bg-black/20 text-black' : 'bg-dark-card text-gray-500'
                        }`}>{tab.count}</span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default AnimeTabs;
