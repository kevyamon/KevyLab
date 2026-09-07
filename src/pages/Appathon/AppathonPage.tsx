import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GitFork, Fingerprint, GitMerge, ArrowRight, Clock, Trophy } from 'iconoir-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { apiClient } from '../../api/client';
import { IEvent, EventStatus, IEvaluationCriterion } from '../../types/contracts';
import { AppathonTimeline } from './AppathonTimeline';
import { AppathonFaqSection } from './AppathonFaqSection';

/**
 * ============================================================================
 * KEVYLAB — PAGE PRINCIPALE DU CONCOURS APPATHON (/appathon)
 * ============================================================================
 * Hub officiel du concours : Concept, Pourquoi participer, Déroulement,
 * Calendrier, Grille de notation sur 100 points, FAQ et CTA temps réel.
 * ============================================================================
 */

export const AppathonPage: React.FC = () => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [criteria, setCriteria] = useState<IEvaluationCriterion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<IEvent>('/events/active')
      .then(async (activeEvent) => {
        setEvent(activeEvent);
        if (activeEvent._id) {
          const crit = await apiClient
            .get<IEvaluationCriterion[]>(`/events/${activeEvent._id}/evaluation-criteria`)
            .catch(() => []);
          setCriteria(crit);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div style={{ maxWidth: '1100px', margin: '80px auto', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '15px' }}>
        Chargement des données en cours...
      </div>
    );
  }

  const isOpen = event?.status === EventStatus.APPLICATIONS_OPEN;

  const defaultCriteria = [
    { label: 'Utilité concrète & Pertinence du problème', maxScore: 30 },
    { label: 'Faisabilité technique & Clarté architecturale', maxScore: 25 },
    { label: 'Clarté des fonctionnalités MVP cibles', maxScore: 20 },
    { label: 'Potentiel d’évolution & Viabilité', maxScore: 15 },
    { label: 'Originalité & Démarche d’innovation', maxScore: 10 }
  ];

  const activeCriteria = criteria.length > 0 ? criteria : defaultCriteria;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 80px 24px' }}>
      {/* En-tête de l'Appathon */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-accent-subtle)',
            border: '1px solid var(--color-border-accent)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-accent)',
            marginBottom: '20px'
          }}
        >
          <span>Édition Fondatrice 2026</span>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '18px' }}>
          KevyLab Appathon 2026
        </h1>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '720px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
          Le premier concours d’innovation logicielle du laboratoire. Transformez votre vision
          en prototype concret et accédez aux ressources d’ingénierie du Lab.
        </p>

        {/* CTA Piloté par l'autorité du Backend */}
        <div>
          {isOpen ? (
            <Link to="/appathon/participer">
              <Button variant="primary" size="lg">
                <span>Déposer ma candidature</span>
                <ArrowRight width={18} height={18} strokeWidth={1.75} />
              </Button>
            </Link>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-text-muted)',
                fontSize: '15px'
              }}
            >
              <Clock width={16} height={16} strokeWidth={1.75} />
              <span>Les candidatures à cette édition sont actuellement clôturées.</span>
            </div>
          )}
        </div>
      </div>

      {/* Grille de contenu principal */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {/* Blocs : Pourquoi participer & Qui peut participer */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Card>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GitFork width={20} height={20} color="var(--color-accent-primary)" strokeWidth={1.75} />
              <span>Pourquoi participer ?</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
              Bénéficiez de l’expertise d’ingénieurs seniors pour concrétiser votre solution logicielle,
              gagnez en visibilité au sein de l’écosystème technologique et intégrez le programme
              d’incubation et d’accompagnement sur mesure du laboratoire KevyLab.
            </p>
          </Card>

          <Card>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Fingerprint width={20} height={20} color="var(--color-status-accepted)" strokeWidth={1.75} />
              <span>Qui peut participer ?</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
              Le concours est ouvert à tous : créateurs indépendants, étudiants, développeurs, designers
              ou collectifs. Il n’est pas obligatoire d’être développeur chevronné ; la pertinence du problème résolu
              et l’utilité du MVP sont déterminantes.
            </p>
          </Card>

          <Card>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GitMerge width={20} height={20} color="var(--color-status-review)" strokeWidth={1.75} />
              <span>Déroulement du concours</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '12px' }}>
              Processus en 4 étapes transparentes : Dépôt du dossier en ligne, instruction technique par le comité,
              entretiens d’approfondissement avec les finalistes, puis proclamation publique des lauréats.
            </p>
            <Link to="/appathon/reglement" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-accent)' }}>
              Consulter le règlement officiel →
            </Link>
          </Card>
        </div>

        {/* Section Calendrier officiel de l'événement */}
        <AppathonTimeline />

        {/* Grille de Notation sur 100 points */}
        <Card>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
              Critères d’Évaluation (Notation sur 100 points)
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              La sélection officielle repose sur la répartition stricte suivante définie par le comité technique :
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeCriteria.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: 'var(--color-bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  {c.label}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: 'var(--color-accent-subtle)',
                    color: 'var(--color-accent-primary)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {c.maxScore} pts
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Section FAQ Accordéon interactive */}
        <AppathonFaqSection eventId={event?._id} />

        {/* Accès aux résultats & Palmarès */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/appathon/resultats">
            <Button variant="secondary" size="lg">
              <Trophy width={16} height={16} strokeWidth={1.75} />
              <span>Consulter le palmarès & les résultats</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
