import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { MOCK_QUIZZES } from '../../data/mockQuizzes';
import { useProgress } from '../../context/ProgressContext';
import { useCourses } from '../../context/CourseContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function Quiz() {
  const { courseId, quizId } = useParams();
  const { submitQuizScore } = useProgress();
  const { getCourseById } = useCourses();

  const course = getCourseById(courseId);
  const quiz = MOCK_QUIZZES[quizId] || MOCK_QUIZZES["quiz-react-1"];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qIdx]: selectedOptionIdx }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const questions = quiz.questions || [];
  const currentQ = questions[currentQuestionIdx];

  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optIdx
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);
    const passThreshold = quiz.passingScore || 75;
    const passed = scorePct >= passThreshold;

    submitQuizScore(courseId, quizId, scorePct, passThreshold);

    setResult({
      score: scorePct,
      correctCount,
      totalCount: questions.length,
      passed
    });
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
    setResult(null);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Quiz Top Navigation Bar */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between">
        <Link
          to={`/learn/${courseId}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Course</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="brand" size="xs">
            Quiz Assessment
          </Badge>
          <span className="text-xs font-bold text-slate-700 hidden sm:inline truncate max-w-xs">
            {course?.title}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        
        {/* Results Screen if submitted */}
        {isSubmitted && result ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft text-center space-y-8 animate-fadeIn">
            <div className="space-y-3">
              <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-soft ${result.passed ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                {result.passed ? '🏆' : '📝'}
              </div>
              <Badge variant={result.passed ? 'success' : 'danger'} size="md">
                {result.passed ? 'Passed with Distinction' : 'Did Not Pass'}
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-900">
                {result.passed ? 'Outstanding Work!' : 'Keep Practicing!'}
              </h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                {result.passed 
                  ? `You achieved ${result.score}% on this assessment. Your progress has been updated and credited toward your certificate!`
                  : `You scored ${result.score}%. The passing threshold is ${quiz.passingScore || 75}%. Review the explanations below and give it another shot.`}
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto text-center">
              <div>
                <span className="text-xs text-slate-400">Score</span>
                <p className="text-xl font-extrabold text-slate-900">{result.score}%</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Correct</span>
                <p className="text-xl font-extrabold text-emerald-600">{result.correctCount}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Total</span>
                <p className="text-xl font-extrabold text-slate-900">{result.totalCount}</p>
              </div>
            </div>

            {/* Review Detailed Breakdown */}
            <div className="space-y-4 text-left pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Question Breakdown & Explanations:
              </h3>

              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userChoice = selectedAnswers[idx];
                  const isCorrect = userChoice === q.correctIndex;

                  return (
                    <div 
                      key={q.id}
                      className={`p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'} space-y-2`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {idx + 1}. {q.question}
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            Your answer: <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>{q.options[userChoice] || 'Skipped'}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                              Correct answer: {q.options[q.correctIndex]}
                            </p>
                          )}
                          <p className="text-xs text-slate-500 bg-white/80 p-2.5 rounded-xl mt-2 border border-slate-100 italic">
                            💡 {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={handleRetake} leftIcon={RotateCcw}>
                Retake Quiz
              </Button>
              <Link to={`/learn/${courseId}`}>
                <Button variant="primary" size="md">
                  Continue Course
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Active Question Step */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft space-y-8">
            
            {/* Header / Stepper */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-brand-600 uppercase tracking-wider">
                  Question {currentQuestionIdx + 1} of {questions.length}
                </span>
                <span>{answeredCount} of {questions.length} answered</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 pt-2 leading-snug">
                {currentQ.question}
              </h1>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`
                      w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-4
                      ${isSelected 
                        ? 'border-brand-600 bg-brand-50/70 ring-2 ring-brand-500/20 text-brand-900 font-bold shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 font-medium'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{optionText}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stepper Footer Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                leftIcon={ChevronLeft}
              >
                Previous
              </Button>

              <div className="flex items-center gap-3">
                {currentQuestionIdx < questions.length - 1 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                    rightIcon={ChevronRight}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    size="md"
                    onClick={handleSubmit}
                    disabled={!isAllAnswered}
                    rightIcon={CheckCircle2}
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
