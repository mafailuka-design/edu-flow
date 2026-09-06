import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Trash2, 
  Layers, 
  BookOpen, 
  DollarSign, 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

export default function CreateCourse() {
  const { user } = useAuth();
  const { addCourse } = useCourses();
  const navigate = useNavigate();

  // Basic Course Details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [level, setLevel] = useState('Beginner');
  const [price, setPrice] = useState('49.99');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80');
  const [duration, setDuration] = useState('8 hours');
  const [objectives, setObjectives] = useState(
    "Master foundational principles and concepts\nBuild practical projects from scratch\nDeploy solutions using best practices"
  );
  const [requirements, setRequirements] = useState(
    "Basic computer literacy\nA computer with internet connection"
  );

  // Dynamic Modules and Lessons state
  const [modules, setModules] = useState([
    {
      id: `mod-new-1`,
      title: "Module 1: Foundations & Setup",
      duration: "1h 30m",
      lessons: [
        {
          id: `les-new-1-1`,
          title: "Introduction & Environment Setup",
          duration: "15m",
          type: "video",
          summary: "Overview of tools, course roadmap, and configuring your development workspace.",
          content: "Welcome to this masterclass! In this lesson, we introduce the core concepts, discuss prerequisites, and walk through configuring all necessary software."
        },
        {
          id: `les-new-1-2`,
          title: "Core Architecture & Key Principles",
          duration: "25m",
          type: "video",
          summary: "Deep dive into the fundamental building blocks and workflow.",
          content: "Understand the overarching architectural patterns and mental models that will guide you through this curriculum."
        }
      ]
    }
  ]);

  const [error, setError] = useState('');

  const addModule = () => {
    const newModNumber = modules.length + 1;
    setModules(prev => [
      ...prev,
      {
        id: `mod-new-${Date.now()}`,
        title: `Module ${newModNumber}: New Topic`,
        duration: "1h 00m",
        lessons: [
          {
            id: `les-new-${Date.now()}-1`,
            title: "Lesson 1",
            duration: "15m",
            type: "video",
            summary: "Key lesson summary and takeaways.",
            content: "Lesson content details and lecture notes."
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
      const lessonNumber = copy[modIdx].lessons.length + 1;
      copy[modIdx].lessons.push({
        id: `les-new-${Date.now()}-${lessonNumber}`,
        title: `Lesson ${lessonNumber}: New Lecture`,
        duration: "20m",
        type: "video",
        summary: "Lesson summary and key concepts.",
        content: "Detailed lecture guide and code walkthrough."
      });
      return copy;
    });
  };

  const removeLesson = (modIdx, lessonIdx) => {
    setModules(prev => {
      const copy = [...prev];
      copy[modIdx].lessons = copy[modIdx].lessons.filter((_, idx) => idx !== lessonIdx);
      return copy;
    });
  };

  const updateLessonField = (modIdx, lessonIdx, field, val) => {
    setModules(prev => {
      const copy = [...prev];
      copy[modIdx].lessons[lessonIdx][field] = val;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Course title and description are required.");
      return;
    }

    const numPrice = parseFloat(price) || 0;

    const newCourseData = {
      title,
      description,
      category,
      level,
      price: numPrice,
      isFree: numPrice === 0,
      image,
      duration,
      objectives: objectives.split('\n').map(s => s.trim()).filter(Boolean),
      requirements: requirements.split('\n').map(s => s.trim()).filter(Boolean),
      modules,
      instructor: {
        id: user?.id || "inst-custom",
        name: user?.name || "Dr. Sarah Jenkins",
        avatar: user?.avatar || "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        title: user?.headline || "Senior Course Instructor",
        bio: user?.bio || "Experienced educator and industry practitioner.",
        rating: 5.0,
        studentsCount: 1,
        coursesCount: 1
      }
    };

    addCourse(newCourseData);
    navigate('/instructor/courses');
  };

  const presetThumbnails = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/instructor/courses')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create a New Course
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Build your curriculum, add interactive modules, and publish to the global catalog.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900">1. Basic Information</h2>
          </div>

          <Input
            label="Course Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Next.js 15 & Modern TypeScript Masterclass"
          />

          <Textarea
            label="Course Description"
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what students will accomplish in this course..."
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
              label="Price (USD) (0 for Free)"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="49.99"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Estimated Total Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 10 hours"
            />
            <Input
              label="Course Thumbnail URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Preset image suggestions */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-500">Or pick a curated banner:</span>
            <div className="flex gap-2">
              {presetThumbnails.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImage(url)}
                  className={`w-20 h-12 rounded-xl overflow-hidden border-2 transition-all ${image === url ? 'border-brand-600 ring-2 ring-brand-500/20' : 'border-slate-200'}`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Learning Objectives */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900">2. Learning Objectives & Prerequisites</h2>
          </div>

          <Textarea
            label="What will students learn? (1 objective per line)"
            rows={4}
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
          />

          <Textarea
            label="Course Requirements / Prerequisites (1 per line)"
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>

        {/* Section 3: Modules & Lessons Builder */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">3. Curriculum Modules & Lessons</h2>
            </div>
            <Button variant="outline" size="sm" onClick={addModule} leftIcon={PlusCircle}>
              Add Module
            </Button>
          </div>

          <div className="space-y-6">
            {modules.map((mod, modIdx) => (
              <div key={mod.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
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
                  
                  {mod.lessons.map((lesson, lessonIdx) => (
                    <div key={lesson.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLessonField(modIdx, lessonIdx, 'title', e.target.value)}
                            placeholder="Lesson Title"
                            className="px-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500 font-semibold"
                          />
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => updateLessonField(modIdx, lessonIdx, 'duration', e.target.value)}
                            placeholder="Duration (e.g. 15m)"
                            className="px-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
                          />
                          <select
                            value={lesson.type}
                            onChange={(e) => updateLessonField(modIdx, lessonIdx, 'type', e.target.value)}
                            className="px-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
                          >
                            <option value="video">Video Lecture</option>
                            <option value="reading">Reading / Notes</option>
                            <option value="quiz">Knowledge Quiz</option>
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

                      <input
                        type="text"
                        value={lesson.summary}
                        onChange={(e) => updateLessonField(modIdx, lessonIdx, 'summary', e.target.value)}
                        placeholder="Brief lesson takeaway..."
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500 text-slate-600"
                      />
                    </div>
                  ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addLesson(modIdx)}
                    leftIcon={PlusCircle}
                    className="text-xs font-semibold text-brand-600"
                  >
                    Add Lesson to Module {modIdx + 1}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="outline" size="lg" onClick={() => navigate('/instructor/courses')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" rightIcon={CheckCircle2}>
            Publish Course
          </Button>
        </div>

      </form>

    </div>
  );
}
