import React, { useRef } from 'react';
import { Award, CheckCircle2, Download, Printer, Share2, X, ShieldCheck } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export default function CertificateModal({ isOpen, onClose, certificate }) {
  const printRef = useRef();

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Verified Certificate of Completion"
      subtitle={`Certificate ID: ${certificate.id}`}
      maxWidth="max-w-3xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Digitally verified by EduFlow Academy
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} leftIcon={Printer}>
              Print / PDF
            </Button>
            <Button variant="primary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      }
    >
      {/* Visual Certificate Card */}
      <div 
        ref={printRef}
        className="relative bg-gradient-to-br from-amber-50/40 via-white to-indigo-50/40 p-8 sm:p-12 rounded-2xl border-4 border-double border-amber-300 shadow-xl overflow-hidden select-none"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-amber-500" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-amber-500" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-amber-500" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-amber-500" />

        {/* Certificate Watermark background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Award className="w-96 h-96 text-brand-900" />
        </div>

        {/* Certificate Content */}
        <div className="relative text-center space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-2">
              <Award className="w-7 h-7" />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-brand-600">EduFlow Academy of Continuing Education</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">Certificate of Mastery</h2>
          </div>

          <p className="text-xs text-slate-500 italic">This is proudly presented to</p>

          {/* Student Name */}
          <div className="border-b-2 border-slate-300 pb-2 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-wide text-brand-700">
              {certificate.studentName || "Alex Morgan"}
            </h1>
          </div>

          {/* Body Text */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            for successfully completing all curriculum modules, hands-on lab practicals, and capstone assessments for
          </p>

          {/* Course Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 px-4 py-2 bg-white/80 rounded-xl shadow-xs border border-slate-200/60 inline-block max-w-xl">
            {certificate.courseTitle}
          </h3>

          {/* Bottom Signatures & Verification */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end text-left border-t border-slate-200 text-xs">
            <div>
              <p className="font-bold text-slate-900 font-serif italic text-sm">{certificate.instructorName}</p>
              <div className="h-0.5 bg-slate-400 w-28 my-1" />
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Instructor & Lead</p>
            </div>

            <div className="text-center hidden sm:block">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 border-2 border-amber-400 flex items-center justify-center text-amber-600 shadow-xs mb-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Verified Academic Seal</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-slate-900">{certificate.issueDate}</p>
              <div className="h-0.5 bg-slate-400 w-28 my-1 ml-auto" />
              <p className="text-[10px] text-slate-400 font-mono">ID: {certificate.id}</p>
            </div>
          </div>

        </div>
      </div>
    </Modal>
  );
}
