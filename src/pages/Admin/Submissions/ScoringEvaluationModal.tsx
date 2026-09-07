import React, { useEffect, useState } from 'react';
import { IEvaluationCriterion } from '../../../types/contracts';
import { apiClient } from '../../../api/client';
import { Button } from '../../../components/common/Button';
import { X, Award } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — MODALE DE NOTATION DES CRITÈRES (ScoringEvaluationModal)
 * ============================================================================
 * Permet à l'évaluateur de saisir les notes par critère (somme sur 100)
 * et de rédiger des appréciations administratives confidentielles.
 * ============================================================================
 */

export interface ScoringEvaluationModalProps {
  submissionId: string;
  eventId: string;
  initialScores?: Record<string, number>;
  initialAdminNotes?: string;
  onClose: () => void;
  onSaved: () => void;
}

export const ScoringEvaluationModal: React.FC<ScoringEvaluationModalProps> = ({
  submissionId,
  eventId,
  initialScores = {},
  initialAdminNotes = '',
  onClose,
  onSaved
}) => {
  const [criteria, setCriteria] = useState<IEvaluationCriterion[]>([]);
  const [scores, setScores] = useState<Record<string, number>>(initialScores);
  const [adminNotes, setAdminNotes] = useState(initialAdminNotes);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<IEvaluationCriterion[]>(`/events/${eventId}/evaluation-criteria`)
      .then((data) => setCriteria(data))
      .catch(() => {});
  }, [eventId]);

  const handleScoreChange = (key: string, value: number, maxScore: number) => {
    const validValue = Math.min(Math.max(0, value), maxScore);
    setScores((prev) => ({ ...prev, [key]: validValue }));
  };

  const totalCalculated = Object.values(scores).reduce((sum, s) => sum + (s || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await apiClient.put(`/admin/submissions/${submissionId}/review`, {
        scores,
        adminNotes
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Échec lors de l’enregistrement de la notation.');
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
    fontSize: '14px',
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
          maxWidth: '520px',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <Award size={18} color="var(--color-status-winner)" />
            <span>Grille d’Évaluation & Notation</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {errorMessage && (
            <div style={{ backgroundColor: 'var(--color-status-rejected-bg)', color: 'var(--color-status-rejected)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}>
              {errorMessage}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {criteria.map((c) => (
              <div key={c.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  {c.label} (Max : {c.maxScore} pts)
                </span>
                <input
                  type="number"
                  min={0}
                  max={c.maxScore}
                  value={scores[c.key] || 0}
                  onChange={(e) => handleScoreChange(c.key, parseInt(e.target.value, 10) || 0, c.maxScore)}
                  style={{ width: '80px', textAlign: 'right', ...inputStyle }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontWeight: 700, fontSize: '14px' }}>Total Calculé :</span>
            <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--color-text-accent)' }}>
              {totalCalculated} / 100
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
              Appréciations & Notes internes (Strictement privées)
            </label>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Remarques du jury, points forts, fragilités..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="secondary" size="md" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="primary" size="md" type="submit" isLoading={isLoading}>
              Enregistrer la notation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
