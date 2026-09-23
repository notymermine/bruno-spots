import { useState, useId } from 'react';
import {
  Search,
  Sparkles,
  Heart,
  RotateCcw,
  Zap,
  Moon,
  Library,
  Coffee,
  Users,
  Trees,
  Check,
  Compass,
  X,
  ExternalLink,
} from 'lucide-react';
import { SPOTS_DATA } from './data/spots';
import { Spot, SpotCategory } from './types';
import { SpotCard } from './components/SpotCard';

const CATEGORIES: { label: string; value: 'All' | SpotCategory; icon: typeof Library }[] = [
  { label: 'All Spots', value: 'All', icon: Compass },
  { label: 'Silent Study', value: 'Silent Study', icon: Library },
  { label: 'Collaborative', value: 'Collaborative', icon: Users },
  { label: 'Cafe & Food', value: 'Cafe & Food', icon: Coffee },
  { label: 'Outdoor', value: 'Outdoor', icon: Trees },
];

export default function App() {
  const outletsToggleId = useId();
  const lateToggleId = useId();

  // State management using strictly standard React useState
  const [selectedCategory, setSelectedCategory] = useState<'All' | SpotCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [requireOutlets, setRequireOutlets] = useState<boolean>(false);
  const [requireOpenLate, setRequireOpenLate] = useState<boolean>(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(['rockefeller-library', 'sciences-library']);
  const [highlightedSpotId, setHighlightedSpotId] = useState<string | null>(null);
  const [randomSpotBanner, setRandomSpotBanner] = useState<Spot | null>(null);

  // Toggle favorite handler passed to SpotCard
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setRequireOutlets(false);
    setRequireOpenLate(false);
    setShowFavoritesOnly(false);
    setHighlightedSpotId(null);
    setRandomSpotBanner(null);
  };

  // Surprise Me (Randomizer)
  const handleSurpriseMe = () => {
    // Pick from all spots or current filtered pool
    const pool = filteredSpots.length > 0 ? filteredSpots : SPOTS_DATA;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosen = pool[randomIndex];

    setHighlightedSpotId(chosen.id);
    setRandomSpotBanner(chosen);

    // Scroll to the chosen card
    setTimeout(() => {
      const element = document.getElementById(`spot-${chosen.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Dynamic filtering logic
  const filteredSpots = SPOTS_DATA.filter((spot) => {
    // Category filter
    if (selectedCategory !== 'All' && spot.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = spot.name.toLowerCase().includes(q);
      const matchDesc = spot.description.toLowerCase().includes(q);
      const matchLoc = spot.location.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchLoc) {
        return false;
      }
    }
    // Outlets filter
    if (requireOutlets && !spot.hasOutlets) {
      return false;
    }
    // Open late filter
    if (requireOpenLate && !spot.openLate) {
      return false;
    }
    // Favorites only filter
    if (showFavoritesOnly && !favorites.includes(spot.id)) {
      return false;
    }
    return true;
  });

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0) +
    (requireOutlets ? 1 : 0) +
    (requireOpenLate ? 1 : 0) +
    (showFavoritesOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
      {/* Top Bar Contract: 1 Row, 3 Zones */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600 rounded"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-800 group-hover:scale-125 transition-transform" />
                <span className="text-xl font-serif font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
                  BrunoSpots
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setShowFavoritesOnly(false);
              }}
              className={`hover:text-stone-900 transition-colors cursor-pointer ${
                selectedCategory === 'All' && !showFavoritesOnly
                  ? 'text-amber-900 font-semibold'
                  : ''
              }`}
            >
              All Spots
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Silent Study');
                setShowFavoritesOnly(false);
              }}
              className={`hover:text-stone-900 transition-colors cursor-pointer ${
                selectedCategory === 'Silent Study' && !showFavoritesOnly
                  ? 'text-amber-900 font-semibold'
                  : ''
              }`}
            >
              Quiet Study
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Cafe & Food');
                setShowFavoritesOnly(false);
              }}
              className={`hover:text-stone-900 transition-colors cursor-pointer ${
                selectedCategory === 'Cafe & Food' && !showFavoritesOnly
                  ? 'text-amber-900 font-semibold'
                  : ''
              }`}
            >
              Coffee & Food
            </button>
            <button
              type="button"
              onClick={() => {
                setRequireOpenLate(true);
                setShowFavoritesOnly(false);
              }}
              className={`hover:text-stone-900 transition-colors cursor-pointer ${
                requireOpenLate ? 'text-amber-900 font-semibold' : ''
              }`}
            >
              Late Night
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Surprise Me Button */}
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300/80 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600"
              title="Pick a random study spot"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span className="whitespace-nowrap">Surprise Me</span>
            </button>

            {/* Saved / Favorites Counter Button */}
            <button
              type="button"
              onClick={() => setShowFavoritesOnly((prev) => !prev)}
              aria-pressed={showFavoritesOnly}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600 whitespace-nowrap ${
                showFavoritesOnly
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  showFavoritesOnly ? 'fill-white text-white' : 'text-rose-500 fill-rose-500'
                }`}
              />
              <span>
                Saved (<span className="font-mono tabular-nums">{favorites.length}</span>)
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero Section */}
        <section className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-amber-900/80 font-semibold mb-2">
            College Hill · Brown University
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight text-balance">
            Brown Study & Chill Finder
          </h1>
          <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed text-balance">
            A quick guide to finding where to study, grind on psets, or chill around campus.
          </p>
        </section>

        {/* Randomizer Banner Notification */}
        {randomSpotBanner && (
          <aside
            aria-label="Random study spot highlight"
            className="mb-8 rounded-xl bg-amber-50 border border-amber-300/80 p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 bg-amber-200/80 text-amber-900 rounded-lg shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                  How about here?
                </p>
                <h4 className="text-base font-serif font-bold text-stone-900 mt-0.5">
                  {randomSpotBanner.name}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  {randomSpotBanner.category} · {randomSpotBanner.location} · {randomSpotBanner.noiseLevel}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="text-xs font-medium text-amber-900 hover:text-amber-950 underline underline-offset-4 cursor-pointer"
              >
                Pick another
              </button>
              <button
                type="button"
                onClick={() => setRandomSpotBanner(null)}
                aria-label="Close banner"
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-amber-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}

        {/* Search & Filter Control Center */}
        <section aria-label="Filters and search" className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by building, vibe, or street (e.g., SciLi, Thayer, quiet)..."
                aria-label="Search study spots"
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-stone-200 rounded-xl placeholder:text-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Amenity Toggles */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Outlets Toggle */}
              <button
                type="button"
                id={outletsToggleId}
                onClick={() => setRequireOutlets((prev) => !prev)}
                aria-pressed={requireOutlets}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer select-none ${
                  requireOutlets
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                    requireOutlets ? 'bg-amber-500 border-amber-500' : 'border-stone-300 bg-white'
                  }`}
                >
                  {requireOutlets && <Check className="w-3 h-3 text-stone-950 stroke-[3]" />}
                </div>
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span className="whitespace-nowrap">Outlets Available</span>
              </button>

              {/* Open Late Toggle */}
              <button
                type="button"
                id={lateToggleId}
                onClick={() => setRequireOpenLate((prev) => !prev)}
                aria-pressed={requireOpenLate}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer select-none ${
                  requireOpenLate
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                    requireOpenLate ? 'bg-indigo-500 border-indigo-500' : 'border-stone-300 bg-white'
                  }`}
                >
                  {requireOpenLate && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="whitespace-nowrap">Open Late</span>
              </button>

              {/* Reset button if any filter is active */}
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-2 text-xs text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Clear all active filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.value && !showFavoritesOnly;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    if (showFavoritesOnly) setShowFavoritesOnly(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200/80 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-200/60">
            <div className="flex items-center gap-1.5">
              <span>Showing</span>
              <strong className="font-semibold text-stone-800 font-mono tabular-nums">
                {filteredSpots.length}
              </strong>
              <span>of</span>
              <span className="font-mono tabular-nums">{SPOTS_DATA.length}</span>
              <span>spots</span>
              {showFavoritesOnly && (
                <span className="text-rose-700 font-medium">· Filtered to Saved</span>
              )}
            </div>

            {highlightedSpotId && (
              <button
                type="button"
                onClick={() => setHighlightedSpotId(null)}
                className="text-stone-400 hover:text-stone-600 transition-colors underline cursor-pointer"
              >
                Clear highlight
              </button>
            )}
          </div>
        </section>

        {/* Spot Cards Grid or Empty State */}
        {filteredSpots.length > 0 ? (
          <section
            aria-label="Brown University Study Spots"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredSpots.map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                isFavorite={favorites.includes(spot.id)}
                onToggleFavorite={handleToggleFavorite}
                isHighlighted={highlightedSpotId === spot.id}
              />
            ))}
          </section>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 py-16 px-6 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-5 h-5 text-amber-800" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              No spots found
            </h3>
            <p className="mt-2 text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              Try clearing some filters or loosening your search.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-900 hover:bg-amber-950 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Brown Study Tips & Campus Lore Section */}
        <section className="mt-16 pt-12 border-t border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700">
            <div className="p-5 rounded-xl bg-white border border-stone-200/80">
              <h4 className="text-sm font-serif font-semibold text-stone-900 flex items-center gap-2">
                <Library className="w-4 h-4 text-amber-800" />
                The Rock vs. SciLi
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                The Rock is for actual silence (especially 3rd floor). SciLi (Friedman) is where everyone talks and argues through CS/STEM psets.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-stone-200/80">
              <h4 className="text-sm font-serif font-semibold text-stone-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-800" />
                Outlet Pro-Tip
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Hay and the Rock have plugs under specific desks, while quads obviously have none. Charge your laptop before heading out.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-stone-200/80">
              <h4 className="text-sm font-serif font-semibold text-stone-900 flex items-center gap-2">
                <Moon className="w-4 h-4 text-amber-800" />
                Late Night Access
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Don't forget your physical Brown ID—almost everything switches to card swipe after 7 PM.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-stone-200 bg-white/60 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-800">BrunoSpots</span>
            <span aria-hidden="true">·</span>
            <span>Built for Brown students</span>
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <span>College Hill, Providence, RI</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://library.brown.edu"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-stone-900 transition-colors"
            >
              Brown Libraries <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
