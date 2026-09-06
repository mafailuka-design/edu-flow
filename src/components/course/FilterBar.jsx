import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/mockCourses';
import Select from '../common/Select';
import Button from '../common/Button';

export default function FilterBar({
  selectedCategory = 'all',
  onSelectCategory,
  selectedLevel = 'all',
  onSelectLevel,
  selectedPrice = 'all',
  onSelectPrice,
  selectedRating = 'all',
  onSelectRating,
  sortBy = 'popular',
  onSortBy,
  onResetFilters,
  totalResults = 0,
  hasActiveFilters = false,
  className = ''
}) {
  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free Only' },
    { value: 'paid', label: 'Paid Only' },
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5', label: '★ 4.5 & above' },
    { value: '4.8', label: '★ 4.8 & above' },
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Category Horizontal Scrolling Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id || (cat.id === 'all' && selectedCategory === 'all');
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`
                shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all
                ${isSelected 
                  ? 'bg-brand-600 text-white shadow-soft shadow-brand-500/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}
              `}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Filter Dropdowns Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider pr-2 border-r border-slate-200 hidden sm:flex">
            <Filter className="w-3.5 h-3.5 text-brand-600" />
            <span>Filters</span>
          </div>

          {/* Level Filter */}
          <div className="w-36">
            <Select
              options={levelOptions}
              value={selectedLevel}
              onChange={(e) => onSelectLevel(e.target.value)}
              className="text-xs"
            />
          </div>

          {/* Price Filter */}
          <div className="w-32">
            <Select
              options={priceOptions}
              value={selectedPrice}
              onChange={(e) => onSelectPrice(e.target.value)}
              className="text-xs"
            />
          </div>

          {/* Rating Filter */}
          <div className="w-36">
            <Select
              options={ratingOptions}
              value={selectedRating}
              onChange={(e) => onSelectRating(e.target.value)}
              className="text-xs"
            />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          )}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs font-medium text-slate-500 hidden md:inline">
            Showing <strong className="text-slate-900">{totalResults}</strong> courses
          </span>

          <div className="w-44">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => onSortBy(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
