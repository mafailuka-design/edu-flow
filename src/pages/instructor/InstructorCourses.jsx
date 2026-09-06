import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Eye, Edit, Trash2, Star, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { formatNumber, formatPrice } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';

export default function InstructorCourses() {
  const { user } = useAuth();
  const { courses, getInstructorCourses, deleteCourse } = useCourses();

  const [deleteModalCourse, setDeleteModalCourse] = useState(null);

  const instructorCourses = getInstructorCourses(user?.name);

  const handleDeleteConfirm = () => {
    if (deleteModalCourse) {
      deleteCourse(deleteModalCourse.id);
      setDeleteModalCourse(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Course Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, and organize all your published learning tracks.
          </p>
        </div>

        <Link to="/instructor/create-course">
          <Button variant="primary" size="sm" leftIcon={PlusCircle}>
            Create New Course
          </Button>
        </Link>
      </div>

      {instructorCourses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses created yet"
          description="Ready to share your knowledge? Create your first curriculum and start enrolling students."
          actionLabel="Create Course"
          onAction={() => window.location.href = '/instructor/create-course'}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Course</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Students</th>
                  <th className="py-4 px-4">Rating</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {instructorCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-14 h-10 rounded-lg object-cover shadow-xs shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <Link to={`/courses/${course.id}`} className="font-bold text-slate-900 hover:text-brand-600 truncate block">
                            {course.title}
                          </Link>
                          <span className="text-[11px] text-slate-400">
                            {course.modules?.length || 2} modules • {course.totalLessons || 8} lessons
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <Badge variant="brand" size="xs">{course.category}</Badge>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-900">
                      {formatPrice(course.price)}
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {formatNumber(course.students || 0)}
                    </td>

                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {course.rating || 5.0}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Published
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/courses/${course.id}`} title="Preview Landing Page">
                          <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/instructor/courses/${course.id}/edit`} title="Edit Course">
                          <Button variant="outline" size="sm" className="p-1.5 h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <button
                          onClick={() => setDeleteModalCourse(course)}
                          className="p-1.5 h-8 w-8 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors inline-flex items-center justify-center"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteModalCourse)}
        onClose={() => setDeleteModalCourse(null)}
        title="Confirm Course Deletion"
        subtitle="This action is irreversible and will remove the course from the catalog."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteModalCourse(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
              Delete Course
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to permanently delete <strong>"{deleteModalCourse?.title}"</strong>?
        </p>
      </Modal>

    </div>
  );
}
