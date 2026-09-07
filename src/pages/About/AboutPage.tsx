import React from 'react';
import { Card } from '../../components/common/Card';
import { Target, Compass, Sparkles, ShieldCheck } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — PAGE À PROPOS (/a-propos)
 * ============================================================================
 * Présente l'origine de KevyLab, la vision, la philosophie d'ingénierie,
 * les objectifs à long terme et la gouvernance du laboratoire.
 * ============================================================================
 */

export const AboutPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '60px 24px 80px 24px'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
          Manifeste & Identité
        </div>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-1px',
            marginBottom: '16px'
          }}
        >
          À propos de KevyLab
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '17px',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Un laboratoire d’innovation logicielle pensé comme un studio d’ingénierie,
          une vitrine technologique et un catalyseur d’idées utiles.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <Compass size={24} color="var(--color-accent-primary)" />
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>L’Origine & la Vision</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            KevyLab est né de la volonté de dépasser le cadre conventionnel du portfolio individuel pour instaurer
            un véritable laboratoire d’expérimentation logicielle. Notre ambition est de concevoir des systèmes
            numériques robustes, de tester des hypothèses technologiques audacieuses et de documenter chaque étape
            de fabrication avec la plus grande rigueur d’ingénierie.
          </p>
        </Card>

        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <ShieldCheck size={24} color="var(--color-status-accepted)" />
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Notre Philosophie : Utilité & Durabilité</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            Nous croyons en un développement logiciel sans artifice superflu. Chaque application créée ou incubée
            par le Lab répond à un impératif clair : résoudre un problème authentique avec une ergonomie sans friction,
            une architecture scalable et des standards de sécurité exigeants. Nous favorisons le code pérenne
            conçu pour durer plus d’une décennie.
          </p>
        </Card>

        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <Target size={24} color="var(--color-status-review)" />
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Les Objectifs Stratégiques</h2>
          </div>
          <ul
            style={{
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: 1.6
            }}
          >
            <li>Éditer et maintenir des applications web et mobiles innovantes ;</li>
            <li>Explorer des solutions appliquées en intelligence artificielle et traitement de données ;</li>
            <li>Organiser des concours stimulants (Appathons, hackathons) pour faire émerger des talents ;</li>
            <li>Accompagner méthodiquement les porteurs de projets prometteurs de l’idée au produit.</li>
          </ul>
        </Card>

        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <Sparkles size={24} color="var(--color-status-winner)" />
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Le Hub Événementiel</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            L’Appathon constitue la première matérialisation de notre engagement envers la communauté des créateurs
            numériques. Conçu pour être récurrent et évolutif, ce moteur événementiel permet d’identifier,
            d’évaluer en toute transparence et de récompenser les concepts d’applications les plus percutants.
          </p>
        </Card>
      </div>
    </div>
  );
};
