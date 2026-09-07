import React from 'react';
import { SubmissionStatus } from '../../../types/contracts';

/**
 * ============================================================================
 * KEVYLAB — FILTRE DE STATUTS DE CANDIDATURE (SubmissionStatusFilter)
 * ============================================================================
 * Barre de sélection rapide de statuts pour filtrer la liste des candidatures.
 * ============================================================================
 */

export interface SubmissionStatusFilterProps {
  selectedStatus?: SubmissionStatus | 'ALL';
  onSelectStatus: (status: SubmissionStatus | 'ALL') => void;
}

export const SubmissionStatusFilter: React.FC<SubmissionStatusFilterProps> = ({
  selectedStatus = 'ALL',
  onSelectStatus
}) => {
  const statusList: Array<{ id: SubmissionStatus | 'ALL'; label: string }> = [
    { id: 'ALL', label: 'Toutes' },
    { id: SubmissionStatus.PENDING, label: 'En attente' },
    { id: SubmissionStatus.UNDER_REVIEW, label: 'En revue' },
    { id: SubmissionStatus.NEEDS_INFORMATION, label: 'Précisions requises' },
    { id: SubmissionStatus.SHORTLISTED, label: 'Présélectionnées' },
    { id: SubmissionStatus.ACCEPTED, label: 'Acceptées' },
    { id: SubmissionStatus.REJECTED, label: 'Refusées' },
    { id: SubmissionStatus.WINNER, label: 'Lauréats' }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {statusList.map((st) => {
        const isSelected = selectedStatus === st.id;
        return (
          <button
            key={st.id}
            onClick={() => onSelectStatus(st.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: isSelected ? 'var(--color-accent-primary)' : 'var(--color-border-subtle)',
              backgroundColor: isSelected ? 'var(--color-accent-subtle)' : 'var(--color-bg-surface)',
              color: isSelected ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            {st.label}
          </button>
        );
      })}
    </div>
  );
};
