import React from 'react';
import { Calendar, CheckCircle2, Clock, Trophy, Users, ShieldAlert } from 'lucide-react';
import { Card } from '../../components/common/Card';

/**
 * ============================================================================
 * KEVYLAB — CALENDRIER OFFICIEL DU CONCOURS (AppathonTimeline)
 * ============================================================================
 * Visualisation chronologique des jalons de l'Appathon 2026 conformément
 * à la Section 27 du Cahier des Charges Maître.
 * ============================================================================
 */

export interface TimelineStep {
  date: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
  icon: React.ReactNode;
}

export const AppathonTimeline: React.FC = () => {
  const steps: TimelineStep[] = [
    {
      date: '15 Février 2026',
      title: 'Annonce & Publication Officielle',
      description: 'Dévoilement du concours, ouverture du règlement et publication de la grille de critères sur 100 points.',
      status: 'COMPLETED',
      icon: <CheckCircle2 size={18} color="var(--color-status-accepted)" />
    },
    {
      date: '01 Mars 2026',
      title: 'Ouverture des Candidatures',
      description: 'Dépôt des dossiers via le formulaire multi-étapes avec génération instantanée de la référence unique.',
      status: 'ACTIVE',
      icon: <Clock size={18} color="var(--color-accent-primary)" />
    },
    {
      date: '30 Avril 2026',
      title: 'Clôture Définitive des Dépôts',
      description: 'Fermeture de la plateforme de soumission et verrouillage strict des candidatures pour évaluation.',
      status: 'UPCOMING',
      icon: <ShieldAlert size={18} color="var(--color-status-pending)" />
    },
    {
      date: '15 Mai 2026',
      title: 'Présélection & Instruction Technique',
      description: 'Revue des critères d’utilité, faisabilité et clarté MVP par les ingénieurs du laboratoire.',
      status: 'UPCOMING',
      icon: <Users size={18} color="var(--color-text-secondary)" />
    },
    {
      date: '30 Mai 2026',
      title: 'Annonce des Finalistes & Entretiens',
      description: 'Notification des projets retenus pour les échanges d’approfondissement avec le jury.',
      status: 'UPCOMING',
      icon: <Calendar size={18} color="var(--color-text-secondary)" />
    },
    {
      date: '15 Juin 2026',
      title: 'Palmarès & Proclamation des Lauréats',
      description: 'Publication officielle des vainqueurs, attribution des distinctions et accueil dans le programme du Lab.',
      status: 'UPCOMING',
      icon: <Trophy size={18} color="var(--color-status-winner)" />
    }
  ];

  return (
    <Card>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Calendar size={22} color="var(--color-accent-primary)" />
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
            Calendrier & Étapes Clés de l’Édition 2026
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
          Les dates ci-dessous sont arrêtées par le comité d’organisation pour garantir une instruction équitable et rigoureuse.
        </p>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {steps.map((step, idx) => {
          const isActive = step.status === 'ACTIVE';
          const isCompleted = step.status === 'COMPLETED';

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive
                  ? 'var(--color-accent-subtle)'
                  : 'var(--color-bg-surface)',
                border: '1px solid',
                borderColor: isActive
                  ? 'var(--color-border-accent)'
                  : 'var(--color-border-subtle)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div
                style={{
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {step.icon}
              </div>

              <div style={{ flexGrow: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '4px'
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {step.title}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isActive ? 'var(--color-text-accent)' : isCompleted ? 'var(--color-status-accepted)' : 'var(--color-text-muted)'
                    }}
                  >
                    {step.date}
                  </span>
                </div>

                <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
