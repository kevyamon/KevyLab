import React from 'react';
import { ISubmission, SubmissionStatus } from '../../../types/contracts';

/**
 * ============================================================================
 * KEVYLAB — VUE KANBAN DES CANDIDATURES (SubmissionsKanbanBoard)
 * ============================================================================
 * Colonnes de statut : En attente -> En revue -> Présélectionné -> Accepté -> Refusé -> Lauréat.
 * ============================================================================
 */

export interface SubmissionsKanbanBoardProps {
  submissions: ISubmission[];
  onSelectSubmission: (submission: ISubmission) => void;
  onStatusChange: (submissionId: string, newStatus: SubmissionStatus) => void;
}

export const SubmissionsKanbanBoard: React.FC<SubmissionsKanbanBoardProps> = ({
  submissions,
  onSelectSubmission
}) => {
  const columns: Array<{ status: SubmissionStatus; title: string; color: string }> = [
    { status: SubmissionStatus.PENDING, title: 'En attente', color: 'var(--color-status-pending)' },
    { status: SubmissionStatus.UNDER_REVIEW, title: 'En revue', color: 'var(--color-status-review)' },
    { status: SubmissionStatus.SHORTLISTED, title: 'Présélectionné', color: 'var(--color-status-shortlisted)' },
    { status: SubmissionStatus.ACCEPTED, title: 'Accepté', color: 'var(--color-status-accepted)' },
    { status: SubmissionStatus.REJECTED, title: 'Refusé', color: 'var(--color-status-rejected)' },
    { status: SubmissionStatus.WINNER, title: 'Lauréat', color: 'var(--color-status-winner)' }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        alignItems: 'flex-start',
        overflowX: 'auto',
        paddingBottom: '16px'
      }}
    >
      {columns.map((col) => {
        const colSubs = submissions.filter((s) => s.status === col.status);

        return (
          <div
            key={col.status}
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              minWidth: '240px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* En-tête de colonne */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: col.color }}>
                {col.title}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, backgroundColor: 'var(--color-bg-elevated)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                {colSubs.length}
              </span>
            </div>

            {/* Cartes dans la colonne */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '120px' }}>
              {colSubs.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'center', padding: '24px 0' }}>
                  Aucun dossier
                </div>
              ) : (
                colSubs.map((sub) => (
                  <div
                    key={sub._id}
                    onClick={() => onSelectSubmission(sub)}
                    style={{
                      backgroundColor: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'border-color var(--transition-fast)'
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-accent)', marginBottom: '4px' }}>
                      {sub.reference}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                      {sub.project.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                      {sub.candidate.fullName} ({sub.candidate.country})
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      <span>Score : {sub.review?.totalScore !== undefined ? `${sub.review.totalScore}/100` : '—'}</span>
                      <span>{new Date(sub.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
