import React, { useEffect, useState } from 'react';
import { ISubmission } from '../../../types/contracts';
import { apiClient } from '../../../api/client';
import { ScoringEvaluationModal } from './ScoringEvaluationModal';
import { StatusTransitionModal } from './StatusTransitionModal';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { X, Award, GitCommit, ExternalLink, Github } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — FICHE DÉTAILLÉE D'UNE CANDIDATURE (SubmissionDetailPage)
 * ============================================================================
 * Vue à 360° du dossier candidat : Données personnelles, MVP, Profil technique,
 * accès à la notation, historique et actions d'évolution de statut.
 * ============================================================================
 */

export interface SubmissionDetailPageProps {
  submissionId: string;
  onClose: () => void;
}

export const SubmissionDetailPage: React.FC<SubmissionDetailPageProps> = ({
  submissionId,
  onClose
}) => {
  const [submission, setSubmission] = useState<ISubmission | null>(null);
  const [isScoringOpen, setIsScoringOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const data = await apiClient.get<ISubmission>(`/admin/submissions/${submissionId}`);
      setSubmission(data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [submissionId]);

  if (loading || !submission) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-bg-overlay)',
        backdropFilter: 'blur(12px)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* En-tête de la fiche */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 28px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-accent)', marginBottom: '4px' }}>
              {submission.reference}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{submission.project.title}</h2>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="outline" size="sm" onClick={() => setIsScoringOpen(true)}>
              <Award size={14} />
              <span>Noter ({submission.review?.totalScore || 0}/100)</span>
            </Button>

            <Button variant="primary" size="sm" onClick={() => setIsStatusOpen(true)}>
              <GitCommit size={14} />
              <span>Statut : {submission.status}</span>
            </Button>

            <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer', padding: '6px' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Corps de la fiche */}
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Bloc Candidat */}
          <Card>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Candidat & Équipe</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              <div><strong>Nom :</strong> {submission.candidate.fullName}</div>
              <div><strong>Courriel :</strong> {submission.candidate.email}</div>
              <div><strong>Téléphone :</strong> {submission.candidate.phone}</div>
              <div><strong>Pays :</strong> {submission.candidate.country} ({submission.candidate.city || 'N/C'})</div>
              <div><strong>Type :</strong> {submission.candidate.teamType}</div>
            </div>
          </Card>

          {/* Bloc Projet */}
          <Card>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Détails du Projet & Spécifications MVP</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              <div><strong>Problème :</strong> {submission.project.problem}</div>
              <div><strong>Solution :</strong> {submission.project.solution}</div>
              <div><strong>Public cible :</strong> {submission.project.targetAudience}</div>
              <div>
                <strong>Fonctionnalités MVP déclarées :</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  {submission.project.mvpFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Bloc Technique */}
          <Card>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Profil Technique & Liens</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              <div><strong>Niveau déclaré :</strong> {submission.technicalProfile.level}</div>
              {submission.project.prototypeUrl && (
                <div>
                  <strong>Lien prototype :</strong>{' '}
                  <a href={submission.project.prototypeUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-accent)' }}>
                    {submission.project.prototypeUrl} <ExternalLink size={12} style={{ display: 'inline' }} />
                  </a>
                </div>
              )}
              {submission.project.githubUrl && (
                <div>
                  <strong>Dépôt GitHub :</strong>{' '}
                  <a href={submission.project.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-accent)' }}>
                    {submission.project.githubUrl} <Github size={12} style={{ display: 'inline' }} />
                  </a>
                </div>
              )}
            </div>
          </Card>

          {/* Appréciations internes */}
          {submission.review?.adminNotes && (
            <Card style={{ backgroundColor: 'var(--color-bg-elevated)', borderLeft: '4px solid var(--color-accent-primary)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                Appréciations confidentielles du jury
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                « {submission.review.adminNotes} »
              </p>
            </Card>
          )}
        </div>
      </div>

      {isScoringOpen && (
        <ScoringEvaluationModal
          submissionId={submission._id}
          eventId={submission.eventId}
          initialScores={submission.review?.scores || {}}
          initialAdminNotes={submission.review?.adminNotes || ''}
          onClose={() => setIsScoringOpen(false)}
          onSaved={fetchDetail}
        />
      )}

      {isStatusOpen && (
        <StatusTransitionModal
          submissionId={submission._id}
          currentStatus={submission.status}
          onClose={() => setIsStatusOpen(false)}
          onStatusUpdated={fetchDetail}
        />
      )}
    </div>
  );
};
