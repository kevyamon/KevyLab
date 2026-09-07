import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ContactType } from '../../types/contracts';
import { apiClient } from '../../api/client';

/**
 * ============================================================================
 * KEVYLAB — PAGE CONTACT & DEMANDES DE PARTENARIATS (/contact)
 * ============================================================================
 * Formulaire de contact typé par motif d'échange avec validation stricte
 * et confirmation immédiate sans rafraîchissement.
 * ============================================================================
 */

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: ContactType.GENERAL,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await apiClient.post('/contact', formData);
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi de votre message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-bg-input)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    marginBottom: '6px'
  };

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '60px 24px 80px 24px'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-text-accent)',
            marginBottom: '8px'
          }}
        >
          Échanges & Collaborations
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>
          Contacter le Laboratoire
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Une proposition de partenariat, une question sur nos projets ou nos concours ? Écrivez-nous.
        </p>
      </div>

      <Card>
        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '40px 16px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-status-accepted-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                color: 'var(--color-status-accepted)'
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>Message transmis !</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Nous vous remercions pour votre démarche. L’équipe de KevyLab examinera votre message avec attention
              et vous répondra dans les meilleurs délais.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  subject: '',
                  type: ContactType.GENERAL,
                  message: ''
                });
              }}
            >
              Envoyer un autre message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {errorMessage && (
              <div
                style={{
                  backgroundColor: 'var(--color-status-rejected-bg)',
                  border: '1px solid var(--color-status-rejected)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  color: 'var(--color-status-rejected)',
                  fontSize: '14px'
                }}
              >
                {errorMessage}
              </div>
            )}

            <div>
              <label style={labelStyle}>Nom complet *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex. Sarah Martin"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Adresse courriel *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nom@exemple.com"
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Type de demande *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ContactType })}
                  style={inputStyle}
                >
                  <option value={ContactType.GENERAL}>Renseignement général</option>
                  <option value={ContactType.PARTNERSHIP}>Partenariat institutionnel</option>
                  <option value={ContactType.PROJECT}>Proposition de projet</option>
                  <option value={ContactType.EVENT}>Question sur l’Appathon</option>
                  <option value={ContactType.MEDIA}>Presse & Média</option>
                  <option value={ContactType.OTHER}>Autre sujet</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Sujet *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Objet de votre message"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Détaillez votre demande ou votre projet..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <Button variant="primary" size="lg" type="submit" isLoading={isSubmitting}>
              <Send size={16} />
              <span>Transmettre le message</span>
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};
