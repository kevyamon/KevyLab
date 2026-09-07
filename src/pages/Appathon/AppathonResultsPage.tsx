import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { apiClient } from '../../api/client';
import { IEvent, IPublicWinner } from '../../types/contracts';
import { LaureateCard } from './LaureateCard';

/**
 * ============================================================================
 * KEVYLAB — PAGE DES RÉSULTATS & LAURÉATS (/appathon/resultats)
 * ============================================================================
 * Affiche l'état d'attente avant publication, puis le palmarès officiel
 * dynamique avec les cartes de prestige des lauréats (photo, rôle, distinction).
 * ============================================================================
 */

export const AppathonResultsPage: React.FC = () => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [winners, setWinners] = useState<IPublicWinner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<IEvent>('/events/active')
      .then(async (activeEvent) => {
        setEvent(activeEvent);
        if (activeEvent && activeEvent.resultsPublished && activeEvent._id) {
          const fetchedWinners = await apiClient
            .get<IPublicWinner[]>(`/events/${activeEvent._id}/winners`)
            .catch(() => []);
          setWinners(fetchedWinners || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ maxWidth: '900px', margin: '80px auto', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '15px' }}>
        Chargement des données en cours...
      </div>
    );
  }

  const resultsPublished = event?.resultsPublished || false;

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '50px 24px 80px 24px'
      }}
    >
      <Link
        to="/appathon"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
          fontWeight: 500,
          marginBottom: '32px'
        }}
      >
        <ArrowLeft size={16} />
        <span>Retour à l’Appathon</span>
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
            marginBottom: '16px'
          }}
        >
          <span>Palmarès Officiel</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>
          Résultats & Proclamation des Lauréats
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          KevyLab Appathon • Édition Fondatrice 2026
        </p>
      </div>

      {!resultsPublished ? (
        <Card style={{ textAlign: 'center', padding: '60px 24px' }}>
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
              color: 'var(--color-status-pending)'
            }}
          >
            <Clock size={32} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
            Les délibérations sont en cours
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontSize: '15px'
            }}
          >
            Les résultats officiels ne sont pas encore proclamés. Le comité d’évaluation examine
            actuellement les projets retenus. La liste des lauréats sera dévoilée ici même dès la signature du palmarès.
          </p>
        </Card>
      ) : winners.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
            Les délibérations finales sont closes. La proclamation individuelle des lauréats est en cours de publication par le secrétariat du jury.
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {winners.map((winner) => (
            <LaureateCard key={winner._id} winner={winner} />
          ))}
        </div>
      )}
    </div>
  );
};
