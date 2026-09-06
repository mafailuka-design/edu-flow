import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  FastForward, 
  CheckCircle2,
  FileText,
  HelpCircle
} from 'lucide-react';
import Button from '../common/Button';

export default function VideoPlayer({
  lesson,
  courseTitle,
  isCompleted,
  onMarkComplete,
  onTakeQuiz = null
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(35);
  const totalTime = 12 * 60; // 12 minutes dummy

  // Reset play state when lesson changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [lesson?.id]);

  // Simulate video playback ticker
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            if (!isCompleted && onMarkComplete) {
              onMarkComplete();
            }
            return totalTime;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalTime, isCompleted, onMarkComplete]);

  const formatVideoTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = Math.floor(secs % 60);
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  if (!lesson) {
    return (
      <div className="aspect-video w-full bg-slate-900 rounded-2xl flex items-center justify-center text-white">
        <p className="text-sm font-medium text-slate-400">Select a lesson to begin learning.</p>
      </div>
    );
  }

  // If lesson is a Quiz trigger
  if (lesson.type === 'quiz') {
    return (
      <div className="aspect-video w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl flex flex-col items-center justify-center text-white p-8 text-center shadow-xl border border-indigo-900/50">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold mb-2">{lesson.title}</h3>
        <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
          {lesson.summary || "Complete this interactive module assessment to evaluate your knowledge and unlock your certificate."}
        </p>
        <Button variant="primary" size="lg" onClick={onTakeQuiz}>
          Start Knowledge Assessment
        </Button>
      </div>
    );
  }

  // If lesson is a Reading article
  if (lesson.type === 'reading') {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          Reading & Practical Guide
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">{lesson.title}</h2>
        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
          <p className="font-medium text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">
            {lesson.summary}
          </p>
          <div className="whitespace-pre-line">
            {lesson.content}
          </div>
        </div>
      </div>
    );
  }

  // Standard Video Player
  return (
    <div className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between group">
      
      {/* Background Poster / Interactive Simulation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 opacity-90" />
        <div className="relative text-center px-4 z-10 select-none">
          <p className="text-xs font-bold tracking-wider uppercase text-brand-400 mb-2">
            {courseTitle}
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-white max-w-lg mx-auto line-clamp-2">
            {lesson.title}
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Interactive Video Simulation Player
          </p>
        </div>
      </div>

      {/* Top Banner overlay */}
      <div className="relative z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 truncate max-w-xs">{lesson.title}</span>
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        )}
      </div>

      {/* Center Big Play Button */}
      <div className="relative z-20 flex items-center justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-600/90 hover:bg-brand-600 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-xs"
        >
          {isPlaying ? <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-current" /> : <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" />}
        </button>
      </div>

      {/* Bottom Control Bar */}
      <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent space-y-2">
        {/* Progress Timeline Scrubber */}
        <div 
          className="w-full h-1.5 bg-slate-700/80 hover:h-2.5 rounded-full cursor-pointer transition-all relative overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickRatio = (e.clientX - rect.left) / rect.width;
            setCurrentTime(clickRatio * totalTime);
          }}
        >
          <div
            className="h-full bg-brand-500 rounded-full transition-all"
            style={{ width: `${(currentTime / totalTime) * 100}%` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between text-white text-xs pt-1">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="hover:text-brand-400 transition-colors"
              aria-label="Play/Pause"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              className="hover:text-brand-400 transition-colors"
              title="Rewind 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="hover:text-brand-400 transition-colors"
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="text-[11px] font-mono text-slate-300">
              {formatVideoTime(currentTime)} / {formatVideoTime(totalTime)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed toggle */}
            <button
              onClick={() => {
                const speeds = [1, 1.25, 1.5, 2];
                const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                setPlaybackSpeed(next);
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-semibold text-[11px] transition-colors"
            >
              {playbackSpeed}x
            </button>

            <button 
              onClick={() => {
                const elem = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
              }}
              className="hover:text-brand-400 transition-colors" 
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
