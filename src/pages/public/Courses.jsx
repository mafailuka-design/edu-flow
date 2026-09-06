import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SearchBar from '../../components/course/SearchBar';
import FilterBar from '../../components/course/FilterBar';
import CourseGrid from '../../components/course/CourseGrid';
import Badge from '../../components/common/Badge';

export default function Courses() {
  const { courses } = useCourses();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Keep state in sync if URL params change
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl !== null) setSearchQuery(searchFromUrl);

    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl !== null) setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val.trim()) {
      searchParams.set('search', val);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSelectedRating('all');
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedPrice !== 'all' ||
    selectedRating !== 'all' ||
    sortBy !== 'popular'
  );

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title?.toLowerCase().includes(query);
        const matchesInstructor = course.instructor?.name?.toLowerCase().includes(query);
        const matchesCategory = course.category?.toLowerCase().includes(query);
        const matchesDesc = course.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesInstructor && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && course.category !== selectedCategory) {
        return false;
      }

      // 3. Level filter
      if (selectedLevel !== 'all' && course.level !== selectedLevel) {
        return false;
      }

      // 4. Price filter
      if (selectedPrice === 'free' && course.price !== 0) {
        return false;
      }
      if (selectedPrice === 'paid' && course.price === 0) {
        return false;
      }

      // 5. Rating filter
      if (selectedRating !== 'all') {
        const minRating = parseFloat(selectedRating);
        if ((course.rating || 0) < minRating) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'highest-rated') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'price-low') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === 'price-high') {
        return (b.price || 0) - (a.price || 0);
      }
      // default: popular (students count)
      return (b.students || 0) - (a.students || 0);
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedPrice, selectedRating, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        
        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/80">
            <Compass className="w-3.5 h-3.5" />
            <span>Course Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore All Courses
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
            Discover in-depth curriculums taught by industry professionals. Search by topic or apply multiple filters to find your ideal course.
          </p>
        </div>

        {/* Live Search Input */}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
        />

        {/* Filters and Facets */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          selectedLevel={selectedLevel}
          onSelectLevel={setSelectedLevel}
          selectedPrice={selectedPrice}
          onSelectPrice={setSelectedPrice}
          selectedRating={selectedRating}
          onSelectRating={setSelectedRating}
          sortBy={sortBy}
          onSortBy={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredCourses.length}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-semibold">Active Filters:</span>
            {searchQuery && (
              <Badge variant="brand" size="xs">
                Search: "{searchQuery}"
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="brand" size="xs">
                Category: {selectedCategory}
              </Badge>
            )}
            {selectedLevel !== 'all' && (
              <Badge variant="default" size="xs">
                Level: {selectedLevel}
              </Badge>
            )}
            {selectedPrice !== 'all' && (
              <Badge variant="default" size="xs">
                Price: {selectedPrice === 'free' ? 'Free' : 'Paid'}
              </Badge>
            )}
            {selectedRating !== 'all' && (
              <Badge variant="default" size="xs">
                Rating: {selectedRating}+
              </Badge>
            )}
          </div>
        )}

        {/* Courses Responsive Grid */}
        <CourseGrid
          courses={filteredCourses}
          columns={3}
          emptyTitle="No courses match your criteria"
          emptyDescription="Try adjusting or resetting your search keywords, category, or level filters."
          onResetFilters={handleResetFilters}
        />

      </main>

      <Footer />
    </div>
  );
}
