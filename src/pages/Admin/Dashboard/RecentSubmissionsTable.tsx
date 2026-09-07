import React from 'react';
import { Card } from '../../../components/common/Card';

/**
 * ============================================================================
 * KEVYLAB — TABLEAU DES CANDIDATURES RÉCENTES (Dashboard)
 * ============================================================================
 * Résumé chronologique des dernières candidatures reçues avec leurs statuts.
 * ============================================================================
 */

export interface RecentSubmissionItem {
  _id: string;
  reference: string;
  candidate: { fullName: string };
  project: { title: string };
  status: string;
  review?: { totalScore?: number };
  createdAt: string;
}

export interface RecentSubmissionsTableProps {
  submissions: RecentSubmissionItem[];
  onSelectSubmission?: (id: string) => void;
}

export const RecentSubmissionsTable: React.FC<RecentSubmissionsTableProps> = ({
  submissions,
  onSelectSubmission
}) => {
  return (
    <Card style={{ overflowX: 'auto', padding: '0' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Candidatures Récentes</h3>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}>
            <th style={{ padding: '12px 20px', fontWeight: 600 }}>Référence</th>
            <th style={{ padding: '12px 20px', fontWeight: 600 }}>Candidat</th>
            <th style={{ padding: '12px 20px', fontWeight: 600 }}>Projet</th>
            <th style={{ padding: '12px 20px', fontWeight: 600 }}>Score</th>
            <th style={{ padding: '12px 20px', fontWeight: 600 }}>Statut</th>
            <th style={{ padding: '12px 20px', fontWeight: 600 }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                Aucune candidature enregistrée pour le moment.
              </td>
            </tr>
          ) : (
            submissions.map((sub) => (
              <tr
                key={sub._id}
                onClick={() => onSelectSubmission && onSelectSubmission(sub._id)}
                style={{
                  borderBottom: '1px solid var(--color-border-subtle)',
                  cursor: onSelectSubmission ? 'pointer' : 'default',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--color-text-accent)' }}>
                  {sub.reference}
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--color-text-primary)' }}>
                  {sub.candidate.fullName}
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--color-text-secondary)' }}>
                  {sub.project.title}
                </td>
                <td style={{ padding: '14px 20px', fontWeight: 600 }}>
                  {sub.review?.totalScore !== undefined ? `${sub.review.totalScore}/100` : '—'}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    {sub.status}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--color-text-muted)' }}>
                  {new Date(sub.createdAt).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};
