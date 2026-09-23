import React from 'react';
import { Heart, MapPin, Zap, Moon, VolumeX, Volume1, Volume2, Clock } from 'lucide-react';
import { Spot } from '../types';

interface SpotCardProps {
  spot: Spot;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isHighlighted?: boolean;
}

export const SpotCard: React.FC<SpotCardProps> = ({
  spot,
  isFavorite,
  onToggleFavorite,
  isHighlighted = false,
}) => {
  // Category aesthetic accents
  const getCategoryTheme = (category: Spot['category']) => {
    switch (category) {
      case 'Silent Study':
        return {
          label: 'Silent Study',
          badgeText: 'text-stone-700',
          accentBorder: 'border-l-stone-600',
        };
      case 'Collaborative':
        return {
          label: 'Collaborative',
          badgeText: 'text-amber-800',
          accentBorder: 'border-l-amber-600',
        };
      case 'Cafe & Food':
        return {
          label: 'Cafe & Food',
          badgeText: 'text-orange-800',
          accentBorder: 'border-l-orange-600',
        };
      case 'Outdoor':
        return {
          label: 'Outdoor',
          badgeText: 'text-emerald-800',
          accentBorder: 'border-l-emerald-600',
        };
    }
  };

  const getNoiseDetails = (level: Spot['noiseLevel']) => {
    switch (level) {
      case 'Silent':
        return {
          icon: <VolumeX className="w-3.5 h-3.5 text-stone-500" />,
          label: 'Silent',
          color: 'text-stone-600',
        };
      case 'Moderate':
        return {
          icon: <Volume1 className="w-3.5 h-3.5 text-amber-600" />,
          label: 'Moderate noise',
          color: 'text-amber-700',
        };
      case 'Lively':
        return {
          icon: <Volume2 className="w-3.5 h-3.5 text-orange-600" />,
          label: 'Lively / Social',
          color: 'text-orange-700',
        };
    }
  };

  const theme = getCategoryTheme(spot.category);
  const noise = getNoiseDetails(spot.noiseLevel);

  return (
    <article
      id={`spot-${spot.id}`}
      className={`group relative flex flex-col justify-between rounded-xl bg-white p-5 md:p-6 transition-all duration-200 border-l-4 ${
        theme.accentBorder
      } ${
        isHighlighted
          ? 'ring-2 ring-amber-500 shadow-lg bg-amber-50/20'
          : 'border border-stone-200/80 shadow-xs hover:shadow-md hover:border-stone-300'
      }`}
    >
      <div>
        {/* Top Header Row: Category metadata + Favorite Button */}
        <div className="flex items-start justify-between gap-3 mb-2">
          {/* Metadata zero-pill clean typographic kicker */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs font-medium text-stone-500">
            <span className={theme.badgeText}>{theme.label}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-stone-600">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              {spot.location}
            </span>
            {isHighlighted && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-amber-700 font-semibold tracking-wide">
                  Random Pick
                </span>
              </>
            )}
          </div>

          {/* Heart / Favorite Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleFavorite(spot.id)}
            aria-label={isFavorite ? `Remove ${spot.name} from favorites` : `Add ${spot.name} to favorites`}
            title={isFavorite ? 'Remove from saved spots' : 'Save to favorites'}
            className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-amber-600 ${
              isFavorite
                ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
                : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${isFavorite ? 'fill-current scale-110' : ''}`}
            />
          </button>
        </div>

        {/* Spot Name */}
        <h3 className="text-lg md:text-xl font-serif font-semibold text-stone-900 group-hover:text-amber-950 transition-colors">
          {spot.name}
        </h3>

        {/* Spot Description */}
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {spot.description}
        </p>

        {/* Best for tip (if available) */}
        {spot.bestFor && (
          <p className="mt-2.5 text-xs text-stone-500 italic">
            <span className="font-medium text-stone-700 not-italic">Best for:</span> {spot.bestFor}
          </p>
        )}
      </div>

      {/* Footer Amenities & Status Strip */}
      <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          {/* Noise Level with Icon */}
          <div className="flex items-center gap-1.5 font-medium">
            {noise.icon}
            <span className={noise.color}>{noise.label}</span>
          </div>

          {/* Amenities indicators */}
          <div className="flex items-center gap-3 text-stone-500">
            {spot.hasOutlets ? (
              <span className="flex items-center gap-1 text-emerald-700 font-medium" title="Power outlets available">
                <Zap className="w-3.5 h-3.5" />
                <span>Outlets</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-stone-400" title="Limited or no power outlets">
                <Zap className="w-3.5 h-3.5 opacity-40" />
                <span>No outlets</span>
              </span>
            )}

            {spot.openLate && (
              <span className="flex items-center gap-1 text-indigo-700 font-medium" title="Open late night">
                <Moon className="w-3.5 h-3.5" />
                <span>Open Late</span>
              </span>
            )}
          </div>
        </div>

        {spot.buildingHours && (
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>{spot.buildingHours}</span>
          </div>
        )}
      </div>
    </article>
  );
};
