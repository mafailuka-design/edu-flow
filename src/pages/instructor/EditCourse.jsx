import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  Sparkles, 
  PlusCircle, 
  Trash2, 
  CheckCircle2 
} from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

export default function EditCourse() {
  const { id } = useParams();
  const { getCourseById, updateCourse } = useCourses();
  const navigate = useNavigate();

  const course = getCourseById(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [level, setLevel] = useState('Beginner');
  const [price, setPrice] = useState('49.99');
  const [duration, setDuration] = useState('10 hours');
  const [image, setImage] = useState('');
  const [objectives, setObjectives] = useState('');
  const [modules, setModules] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setCategory(course.category || 'Development');
      setLevel(course.level || 'Beginner');
      setPrice(String(course.price ?? 49.99));
      setDuration(course.duration || '10 hours');
      setImage(course.image || '');
      setObjectives(course.objectives?.join('\n') || '');
      setModules(course.modules || []);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Course Not Found</h2>
        <Button variant="primary" onClick={() => navigate('/instructor/courses')}>
          Back to Courses
        </Button>
      </div>
    );
  }

  const addModule = () => {
    setModules(prev => [
      ...prev,
      {
        id: `mod-${Date.now()}`,
        title: `New Module ${prev.length + 1}`,
        duration: "1h",
        lessons: [
          {
            id: `les-${Date.now()}-1`,
            title: "Lesson 1",
            duration: "15m",
            type: "video",
            summary: "Lesson summary"
          }
        ]
      }
    ]);
  };

  const removeModule = (modIdx) => {
    setModules(prev => prev.filter((_, idx) => idx !== modIdx));
  };

  const updateModuleTitle = (modIdx, val) => {
    setModules(prev => {
      const copy = [...prev];
      copy[modIdx].title = val;
      return copy;
    });
  };

  const addLesson = (modIdx) => {
    setModules(prev => {
      const copy = [...prev];
      copy[modIdx].lessons.push({
        id: `les-${Date.now()}`,
        title: "New Lecture",
        duration: "15m",
        type: "video",
        summary: "Lesson summary"
      });
      return copy;
    });
  };

  const removeLesson = (modIdx, lIdx) => {
    setModules(prev => {
      const copy = [...prev];
      copy[modIdx].lessons = copy[modIdx].lessons.filter((_, idx) => idx !== lIdx);
      return copy;
    });
  };

  const updateLessonField = (modIdx, lIdx, field, val) => {
    setModules(prev => {
      const copy = [...prev];
      copy[modIdx].lessons[lIdx][field] = val;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numPrice = parseFloat(price) || 0;

    updateCourse(course.id, {
      title,
      description,
      category,
      level,
      price: numPrice,
      isFree: numPrice === 0,
      duration,
      image,
      objectives: objectives.split('\n').map(s => s.trim()).filter(Boolean),
      modules
    });

    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/instructor/courses');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/instructor/courses')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Management</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Edit Course: {course.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Modify curriculum details, module lectures, and pricing.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Course updated successfully! Returning to course list...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
          </div>

          <Input
            label="Course Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description"
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: 'Development', label: 'Development' },
                { value: 'Design', label: 'Design' },
                { value: 'Data Science', label: 'Data Science' },
                { value: 'Marketing', label: 'Marketing' },
                { value: 'Business', label: 'Business' },
                { value: 'Finance', label: 'Finance' },
                { value: 'Photography', label: 'Photography' },
                { value: 'Personal Development', label: 'Personal Development' },
              ]}
            />

            <Select
              label="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              options={[
                { value: 'Beginner', label: 'Beginner' },
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' },
                { value: 'All Levels', label: 'All Levels' },
              ]}
            />

            <Input
              label="Price (USD)"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Input
              label="Thumbnail URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900">Learning Objectives</h2>
          </div>
          <Textarea
            label="Objectives (1 per line)"
            rows={4}
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
          />
        </div>

        {/* Modules & Lessons */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">Curriculum Modules</h2>
            </div>
            <Button variant="outline" size="sm" onClick={addModule} leftIcon={PlusCircle}>
              Add Module
            </Button>
          </div>

          <div className="space-y-6">
            {modules.map((mod, modIdx) => (
              <div key={mod.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <Input
                      label={`Module ${modIdx + 1} Title`}
                      value={mod.title}
                      onChange={(e) => updateModuleTitle(modIdx, e.target.value)}
                    />
                  </div>
                  {modules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModule(modIdx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors mt-6"
                      title="Delete Module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Lessons inside Module */}
                <div className="space-y-3 pl-4 border-l-2 border-brand-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Lessons:</p>
                  
                  {mod.lessons?.map((lesson, lessonIdx) => (
                    <div key={lesson.id} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLessonField(modIdx, lessonIdx, 'title', e.target.value)}
                            placeholder="Lesson Title"
                            className="px-2.5 py-1 text-xs bg-slate-50 rounded border border-slate-200 focus:outline-none focus:border-brand-500 font-semibold"
                          />
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => updateLessonField(modIdx, lessonIdx, 'duration', e.target.value)}
                            placeholder="Duration"
                            className="px-2.5 py-1 text-xs bg-slate-50 rounded border border-slate-200 focus:outline-none focus:border-brand-500"
                          />
                          <select
                            value={lesson.type}
                            onChange={(e) => updateLessonField(modIdx, lessonIdx, 'type', e.target.value)}
                            className="px-2.5 py-1 text-xs bg-slate-50 rounded border border-slate-200 focus:outline-none focus:border-brand-500"
                          >
                            <option value="video">Video</option>
                            <option value="reading">Reading</option>
                            <option value="quiz">Quiz</option>
                          </select>
                        </div>
                        {mod.lessons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLesson(modIdx, lessonIdx)}
                            className="p-1 text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addLesson(modIdx)}
                    leftIcon={PlusCircle}
                    className="text-xs font-semibold text-brand-600"
                  >
                    Add Lesson
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" size="lg" onClick={() => navigate('/instructor/courses')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" rightIcon={CheckCircle2}>
            Save Changes
          </Button>
        </div>

      </form>

    </div>
  );
}
