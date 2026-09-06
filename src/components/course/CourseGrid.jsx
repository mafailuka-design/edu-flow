import React from 'react';
import CourseCard from './CourseCard';
import EmptyState from '../common/EmptyState';

export default function CourseGrid({
  courses = [],
  columns = 3,
  showProgress = false,
  emptyTitle = "No courses found",
  emptyDescription = "Try adjusting your search terms or filters to find what you're looking for.",
  onResetFilters = null
}) {
  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? "Reset Filters" : undefined}
        onAction={onResetFilters}
      />
    );
  }

  const columnClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${columnClass} gap-6`}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} showProgress={showProgress} />
      ))}
    </div>
  );
}
