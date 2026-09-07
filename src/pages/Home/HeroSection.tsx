import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';

/**
 * ============================================================================
 * KEVYLAB — SECTION HÉROS (HeroSection)
 * ============================================================================
 * Présentation officielle de la marque institutionnelle : Laboratoire
 * d'innovation logicielle et d'ingénierie numérique. Zéro couleur en dur.
 * ============================================================================
 */

export interface HeroSectionProps {
  isAppathonActive?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isAppathonActive = true }) => {
  return (
    <section
      style={{
        padding: '90px 24px 70px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Badge de positionnement */}
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
            marginBottom: '28px'
          }}
        >
          <Sparkles size={14} />
          <span>Laboratoire d’ingénierie & d’expérimentation</span>
        </div>

        {/* Titre Principal */}
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
            marginBottom: '24px',
            color: 'var(--color-text-primary)'
          }}
        >
          Laboratoire d’innovation logicielle & d’ingénierie numérique.
        </h1>

        {/* Paragraphe d’introduction */}
        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            maxWidth: '680px',
            marginBottom: '40px'
          }}
        >
          KevyLab conçoit, éprouve et propulse des solutions numériques utiles,
          performantes et durables. Du prototype au déploiement à grande échelle.
        </p>

        {/* Actions principales */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px'
          }}
        >
          <Link to="/projets">
            <Button variant="primary" size="lg">
              <span>Découvrir nos projets</span>
              <ArrowRight size={18} />
            </Button>
          </Link>

          {isAppathonActive && (
            <Link to="/appathon">
              <Button variant="secondary" size="lg">
                <Sparkles size={18} color="var(--color-accent-primary)" />
                <span>Participer au KevyLab Appathon</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
