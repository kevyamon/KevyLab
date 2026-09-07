import React, { useState } from 'react';
import { apiClient } from '../../../api/client';
import { Button } from '../../../components/common/Button';
import { X, Mail, Send } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — MODALE D'ÉMISSION D'UN COURRIEL MANUEL
 * ============================================================================
 * Permet d'adresser une notification spécifique ou une demande de précisions
 * personnalisée directement à un candidat avec traçabilité.
 * ============================================================================
 */

export interface SendCustomEmailModalProps {
  submissionId: string;
  recipientEmail: string;
  onClose: () => void;
  onSent?: () => void;
}

export const SendCustomEmailModal: React.FC<SendCustomEmailModalProps> = ({
  submissionId,
  recipientEmail,
  onClose,
  onSent
}) => {
  const [subject, setSubject] = useState('[KevyLab] Demande de précisions sur votre projet');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage(null);

    try {
      await apiClient.post(`/admin/submissions/${submissionId}/email`, {
        subject,
        message
      });
      if (onSent) onSent();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Échec lors de la mise en file du courriel.');
    } finally {
      setIsSending(false);
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
          maxWidth: '500px',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <Mail size={18} color="var(--color-accent-primary)" />
            <span>Envoyer un courriel à {recipientEmail}</span>
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

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
              Objet du courriel *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
              Corps du message *
            </label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Rédigez ici votre message à destination du candidat..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="secondary" size="md" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="primary" size="md" type="submit" isLoading={isSending}>
              <Send size={16} />
              <span>Transmettre le courriel</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
