import React, { useState } from 'react';
import { SubmissionStatus } from '../../../types/contracts';
import { apiClient } from '../../../api/client';
import { Button } from '../../../components/common/Button';
import { X, GitCommit, AlertTriangle, Trophy, Sparkles } from 'lucide-react';
import { ProjectImageUploader } from '../Projects/ProjectImageUploader';

/**
 * ============================================================================
 * KEVYLAB — MODALE DE CHANGEMENT DE STATUT (StatusTransitionModal)
 * ============================================================================
 * Permet de faire progresser le statut d'une candidature selon la machine à états.
 * Si le statut 'WINNER' est sélectionné, affiche le formulaire de publication
 * prestige du lauréat avec hébergement Cloudinary de sa photo portrait.
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

  // Données du profil lauréat type "Publication Prestige"
  const [photoUrl, setPhotoUrl] = useState('');
  const [role, setRole] = useState('Porteur de Projet & Lauréat');
  const [distinction, setDistinction] = useState('1er Prix — Grand Lauréat');
  const [rank, setRank] = useState(1);
  const [presentationDescription, setPresentationDescription] = useState('');

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

    const payload: Record<string, any> = {
      status: selectedStatus,
      reason
    };

    if (selectedStatus === SubmissionStatus.WINNER) {
      payload.laureateProfile = {
        photoUrl: photoUrl || undefined,
        role: role.trim() || 'Lauréat',
        distinction: distinction.trim() || 'Projet Primé',
        rank: Number(rank) || 1,
        presentationDescription: presentationDescription.trim() || undefined
      };
    }

    try {
      await apiClient.patch(`/admin/submissions/${submissionId}/status`, payload);
      onStatusUpdated();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Transition de statut refusée par le workflow métier.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: 'var(--color-bg-input)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box'
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
          maxWidth: '560px',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: 'var(--radius-lg)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <GitCommit size={18} color="var(--color-accent-primary)" />
            <span>Faire Évoluer le Statut de la Candidature</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer', padding: '4px' }}>
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
              style={inputStyle}
            >
              {availableStatuses.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Section spécifique d'enrichissement si WINNER */}
          {selectedStatus === SubmissionStatus.WINNER && (
            <div
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-status-winner)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-status-winner)', fontWeight: 700, fontSize: '14px' }}>
                <Trophy size={18} />
                <span>Publication d'Honneur du Lauréat (Showcase Public)</span>
              </div>

              {/* Téléverseur Photo Cloudinary */}
              <ProjectImageUploader
                imageUrl={photoUrl}
                onImageUploaded={(url) => setPhotoUrl(url)}
                onImageRemoved={() => setPhotoUrl('')}
                folder="laureates"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Distinction / Titre d'Honneur
                  </label>
                  <input
                    type="text"
                    value={distinction}
                    onChange={(e) => setDistinction(e.target.value)}
                    placeholder="Ex: 1er Prix — Grand Lauréat"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Rang Officiel
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={rank}
                    onChange={(e) => setRank(parseInt(e.target.value, 10) || 1)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  Rôle / Fonction affichée
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Ingénieur Logiciel & Porteur de Projet"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  Texte de présentation / Citation du Lauréat
                </label>
                <textarea
                  rows={3}
                  value={presentationDescription}
                  onChange={(e) => setPresentationDescription(e.target.value)}
                  placeholder="Petite description ou citation inspirante du lauréat valorisée sur la page des résultats..."
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
              Motif administratif ou commentaire (Traçabilité)
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Raison du changement de statut pour le journal d’audit..."
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
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
