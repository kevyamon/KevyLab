import React, { useEffect, useState } from 'react';
import { useApplicationFormStore } from './applicationFormStore';
import { StepTeamCandidate } from './StepTeamCandidate';
import { StepProjectMVP } from './StepProjectMVP';
import { StepTechnicalProfile } from './StepTechnicalProfile';
import { StepReviewSubmit } from './StepReviewSubmit';
import { Card } from '../../components/common/Card';
import { apiClient } from '../../api/client';
import { IEvent, EventStatus } from '../../types/contracts';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';

/**
 * ============================================================================
 * KEVYLAB — ASSISTANT DE CANDIDATURE (ApplicationWizardPage)
 * ============================================================================
 * Stepper visuel moderne orchestrant les 3 étapes de saisie et la soumission
 * finale. Vérifie la clôture de l'événement auprès du backend.
 * ============================================================================
 */

export const ApplicationWizardPage: React.FC = () => {
  const { currentStep } = useApplicationFormStore();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<IEvent>('/events/active')
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const steps = [
    { number: 1, title: 'Candidat & Équipe' },
    { number: 2, title: 'Projet & Spécifications' },
    { number: 3, title: 'Profil Technique' },
    { number: 4, title: 'Récapitulatif' }
  ];

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '80px auto', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        Vérification de l’ouverture du concours...
      </div>
    );
  }

  // Si l'événement est fermé ou absent
  if (!event || event.status !== EventStatus.APPLICATIONS_OPEN) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <Card style={{ padding: '48px 24px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-bg-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: 'var(--color-text-muted)'
            }}
          >
            <Clock size={32} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
            Candidatures clôturées
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
            Les candidatures pour cette édition de l’Appathon sont désormais terminées.
            Nous vous invitons à consulter la page officielle de l’événement pour suivre les délibérations.
          </p>
          <Link to="/appathon">
            <Button variant="secondary">Retourner à la page de l’Appathon</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '50px 24px 80px 24px'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-accent)', textTransform: 'uppercase', marginBottom: '6px' }}>
          KevyLab Appathon 2026
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '10px' }}>
          Dépôt de Candidature
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
          Remplissez les étapes avec soin. Vos données sont automatiquement conservées en local pendant la saisie.
        </p>
      </div>

      {/* Stepper visuel */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '36px',
          padding: '16px 20px',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        {steps.map((step) => {
          const isDone = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: isCurrent
                    ? 'var(--color-accent-primary)'
                    : isDone
                    ? 'var(--color-status-accepted)'
                    : 'var(--color-bg-elevated)',
                  color: isCurrent || isDone ? 'var(--color-text-primary)' : 'var(--color-text-muted)'
                }}
              >
                {isDone ? '✓' : step.number}
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  display: 'none' // affiché selon media query
                }}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      <Card>
        {currentStep === 1 && <StepTeamCandidate />}
        {currentStep === 2 && <StepProjectMVP />}
        {currentStep === 3 && <StepTechnicalProfile />}
        {currentStep === 4 && <StepReviewSubmit eventId={event._id} />}
      </Card>
    </div>
  );
};
