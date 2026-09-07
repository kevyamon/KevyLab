import React from 'react';
import { Card } from '../../components/common/Card';
import { Binocular, Infinite, GraphUp, AntennaSignal, User, Cpu } from 'iconoir-react';

/**
 * ============================================================================
 * KEVYLAB — PAGE À PROPOS (/a-propos)
 * ============================================================================
 * Présente l'origine de KevyLab, le parcours et la vision de son fondateur
 * Kevin Amon, la philosophie d'ingénierie et les objectifs du laboratoire.
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
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Un laboratoire d’ingénierie logicielle fondé par Kevin Amon, pionnier d’une conception
          moderne pilotée par intelligence artificielle agentique et architectures durables.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Le Fondateur & Visionnaire */}
        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <User width={24} height={24} color="var(--color-accent-primary)" strokeWidth={1.75} />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Le Créateur : Kevin Amon</h2>
              <span style={{ fontSize: '13px', color: 'var(--color-text-accent)', fontWeight: 600 }}>
                Fondateur, Ingénieur Logiciel & Architecte Système
              </span>
            </div>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px', marginBottom: '14px' }}>
            KevyLab est le fruit de la vision et de l’initiative personnelle de Kevin Amon. Passionné par l’architecture
            des systèmes et la rigueur du code bien conçu, Kevin a développé cette plateforme comme son propre laboratoire d’ingénierie,
            dépassant les frontières du portfolio classique pour créer un écosystème où la recherche appliquée rencontre
            des cas d’usage concrets.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            Derrière chaque projet, chaque choix d’infrastructure et chaque standard de sécurité déployé sur cette plateforme,
            se trouve la volonté constante de bâtir des solutions fiables, pérennes et respectueuses des utilisateurs, pensées
            pour traverser le temps avec robustesse.
          </p>
        </Card>

        {/* L'Ingénierie Agentique & Pilotage IA */}
        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <Cpu width={24} height={24} color="var(--color-text-accent)" strokeWidth={1.75} />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>L’Ingénierie Pilotée par IA Agentique</h2>
              <span style={{ fontSize: '13px', color: 'var(--color-text-accent)', fontWeight: 600 }}>
                La nouvelle ère de la conception logicielle
              </span>
            </div>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px', marginBottom: '14px' }}>
            KevyLab s’inscrit pleinement dans la nouvelle génération des bâtisseurs du web. Kevin Amon conçoit et orchestre
            l’intégralité de ses systèmes numériques via des environnements d’IA agentiques avancés (tels qu’Antigravity).
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            Loin d’une génération de code aveugle, cette méthode repose sur une symbiose exigeante : l’humain intervient en tant que
            Lead Architect — garant de la vision produit, de la sécurité bancaire, des arbitrages structurels et des protocoles de qualité —,
            tandis que les agents IA opèrent comme des mains d’exécution de haute précision. Cette alliance décuple la vélocité
            sans jamais compromettre la rigueur d’ingénierie.
          </p>
        </Card>

        {/* L'Origine & la Démarche */}
        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <Binocular width={24} height={24} color="var(--color-status-review)" strokeWidth={1.75} />
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>L’Origine & la Démarche</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            KevyLab est né du constat que les portfolios traditionnels sont trop souvent des vitrines figées, déconnectées
            des réalités de la production. Kevin Amon a conçu KevyLab comme un espace actif d’expérimentation :
            un lieu où l'on conçoit des systèmes numériques complets, où l'on éprouve des hypothèses techniques audacieuses
            et où chaque étape de fabrication est documentée avec la plus grande rigueur d’ingénierie.
          </p>
        </Card>

        {/* Philosophie */}
        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <Infinite width={24} height={24} color="var(--color-status-accepted)" strokeWidth={1.75} />
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Notre Philosophie : Utilité, Rigueur & Durabilité</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            Nous croyons en un développement logiciel sans artifice superflu. Chaque application créée ou incubée
            par le Lab répond à un impératif clair : résoudre un problème authentique avec une ergonomie sans friction,
            une architecture scalable et des standards de sécurité stricts. Nous valorisons le code pérenne,
            conçu pour durer plus d’une décennie.
          </p>
        </Card>

        {/* Objectifs Stratégiques */}
        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <GraphUp width={24} height={24} color="var(--color-text-accent)" strokeWidth={1.75} />
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
            <li>Concevoir et maintenir des applications web et mobiles innovantes ;</li>
            <li>Explorer des solutions appliquées en intelligence artificielle et traitement de données ;</li>
            <li>Organiser des concours stimulants (Appathons, hackathons) pour faire émerger des talents ;</li>
            <li>Accompagner méthodiquement les porteurs de projets prometteurs de l’idée au produit fini.</li>
          </ul>
        </Card>

        {/* Hub Événementiel */}
        <Card>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <AntennaSignal width={24} height={24} color="var(--color-status-winner)" strokeWidth={1.75} />
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Le Hub Événementiel & Communautaire</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            L’Appathon constitue la première matérialisation de l'engagement de Kevin Amon envers la communauté des créateurs
            numériques. Conçu pour être récurrent et évolutif, ce moteur événementiel permet d’identifier,
            d’évaluer en toute transparence et de récompenser les concepts d’applications les plus percutants.
          </p>
        </Card>
      </div>
    </div>
  );
};
