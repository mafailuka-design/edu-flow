import React, { useState } from 'react';
import { Award, Download, Printer, ShieldCheck, ExternalLink } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import CertificateModal from '../../components/certificate/CertificateModal';

export default function Certificates() {
  const { certificates } = useProgress();
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Certificates
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Official, digitally verified credentials earned upon completing courses and capstone quizzes.
        </p>
      </div>

      {certificates.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certificates earned yet"
          description="Certificates are automatically awarded when you complete 100% of all course lessons and quizzes."
          actionLabel="View My Courses"
          onAction={() => window.location.href = '/dashboard/courses'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/80 shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <Badge variant="success" size="xs" icon={ShieldCheck}>
                    Verified Credential
                  </Badge>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {cert.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mt-1">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Instructor: <strong className="text-slate-700">{cert.instructorName}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400">Awarded to:</span>
                    <p className="font-bold text-slate-900">{cert.studentName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Issue Date:</span>
                    <p className="font-bold text-slate-900">{cert.issueDate}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Authenticity Verified
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={Printer}
                  onClick={() => setSelectedCert(cert)}
                >
                  View & Print
                </Button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Certificate Visual Modal */}
      <CertificateModal
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />

    </div>
  );
}
