import { Tv, Clock, Calendar, CheckCircle2, RefreshCw } from 'lucide-react';

const Badge = ({ icon: Icon, label, value, accent }) => {
    if (!value) return null;
    return (
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${accent ? 'bg-primary-400/15 border border-primary-400/30' : 'bg-dark-surface border border-dark-border'}`}>
            {Icon && <Icon size={12} className={accent ? 'text-primary-400' : 'text-gray-500'} />}
            <span className={`text-xs font-medium ${accent ? 'text-primary-300' : 'text-gray-400'}`}>{value}</span>
        </div>
    );
};

const AnimeInfoBadges = ({ status, type, totalEpisodes, released }) => {
    const isOngoing = status?.toLowerCase().includes('ongoing') || status?.toLowerCase().includes('airing');
    return (
        <div className="flex flex-wrap gap-2 mb-5">
            <Badge icon={isOngoing ? RefreshCw : CheckCircle2} value={status} accent={isOngoing} />
            <Badge icon={Tv} value={type} />
            {totalEpisodes > 0 && <Badge icon={Clock} value={`${totalEpisodes} Eps`} />}
            <Badge icon={Calendar} value={released} />
        </div>
    );
};

export default AnimeInfoBadges;
