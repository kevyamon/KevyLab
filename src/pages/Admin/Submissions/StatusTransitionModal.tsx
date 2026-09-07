import React, { useState } from 'react';
import { SubmissionStatus } from '../../../types/contracts';
import { apiClient } from '../../../api/client';
import { Button } from '../../../components/common/Button';
import { X, GitCommit, AlertTriangle } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — MODALE DE CHANGEMENT DE STATUT (StatusTransitionModal)
 * ============================================================================
 * Permet de faire progresser le statut d'une candidature selon la machine à états.
 * ============================================================================
 */

export interface StatusTransitionModalProps {
  submissionId: string;
  currentStatus: SubmissionStatus;
  onClose: () => void;
  onStatusUpdated: () => void;
}

export const StatusTransitionModal: React.FC<StatusTransitionModalProps> = ({
  submissionId,
  currentStatus,
  onClose,
  onStatusUpdated
}) => {
  const [selectedStatus, setSelectedStatus] = useState<SubmissionStatus>(currentStatus);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableStatuses: Array<{ id: SubmissionStatus; label: string }> = [
    { id: SubmissionStatus.PENDING, label: 'En attente (PENDING)' },
    { id: SubmissionStatus.UNDER_REVIEW, label: 'En cours d’évaluation (UNDER_REVIEW)' },
    { id: SubmissionStatus.NEEDS_INFORMATION, label: 'Informations complémentaires requises (NEEDS_INFO)' },
    { id: SubmissionStatus.SHORTLISTED, label: 'Projet Présélectionné (SHORTLISTED)' },
    { id: SubmissionStatus.ACCEPTED, label: 'Candidature Acceptée (ACCEPTED)' },
    { id: SubmissionStatus.REJECTED, label: 'Candidature Refusée (REJECTED)' },
    { id: SubmissionStatus.WINNER, label: 'Déclaré Lauréat (WINNER)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await apiClient.patch(`/admin/submissions/${submissionId}/status`, {
        status: selectedStatus,
        reason
      });
      onStatusUpdated();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Transition de statut refusée par le workflow métier.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-bg-overlay)',
        backdropFilter: 'blur(12px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <GitCommit size={18} color="var(--color-accent-primary)" />
            <span>Faire Évoluer le Statut</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {errorMessage && (
            <div style={{ backgroundColor: 'var(--color-status-rejected-bg)', color: 'var(--color-status-rejected)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}>
              <AlertTriangle size={16} style={{ display: 'inline', marginRight: '6px' }} />
              {errorMessage}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
              Statut actuel : <strong style={{ color: 'var(--color-text-primary)' }}>{currentStatus}</strong>
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as SubmissionStatus)}
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'var(--color-bg-input)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              {availableStatuses.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
              Motif administratif ou commentaire (Traçabilité)
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Raison du changement de statut pour le journal d’audit..."
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'var(--color-bg-input)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontSize: '13px',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="secondary" size="md" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="primary" size="md" type="submit" isLoading={isLoading}>
              Confirmer la transition
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
