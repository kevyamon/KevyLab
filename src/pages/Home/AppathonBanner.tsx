import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

/**
 * ============================================================================
 * KEVYLAB — BANNIÈRE ÉVÉNEMENTIELLE APPATHON (AppathonBanner)
 * ============================================================================
 * Mise en avant dynamique de l'Appathon 2026 sur la page d'accueil.
 * Se désactive automatiquement dès lors que l'événement n'accepte plus de candidatures.
 * ============================================================================
 */

export interface AppathonBannerProps {
  isOpen?: boolean;
}

export const AppathonBanner: React.FC<AppathonBannerProps> = ({ isOpen = true }) => {
  if (!isOpen) return null;

  return (
    <section
      style={{
        maxWidth: '1200px',
        margin: '0 auto 60px auto',
        padding: '0 24px'
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-bg-elevated) 0%, var(--color-bg-surface) 100%)',
          border: '1px solid var(--color-border-accent)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 32px',
          boxShadow: 'var(--shadow-glow)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--color-text-accent)',
              marginBottom: '10px'
            }}
          >
            <span>Concours Officiel • Édition Fondatrice</span>
          </div>

          <h2
            style={{
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              marginBottom: '8px'
            }}
          >
            KevyLab Appathon 2026
          </h2>

          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5
            }}
          >
            Vous avez une idée d’application utile ? Transformez-la en projet et bénéficiez de l’accompagnement du Lab.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <Link to="/appathon">
            <Button variant="outline" size="md">
              <span>Découvrir le concours</span>
            </Button>
          </Link>

          <Link to="/appathon/participer">
            <Button variant="primary" size="md">
              <span>Candidater</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
