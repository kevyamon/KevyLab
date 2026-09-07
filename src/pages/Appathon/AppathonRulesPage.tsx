import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

/**
 * ============================================================================
 * KEVYLAB — RÈGLEMENT DU CONCOURS (/appathon/reglement)
 * ============================================================================
 * Texte officiel du règlement du concours consultable directement sur le web
 * et téléchargeable au format PDF.
 * ============================================================================
 */

export const AppathonRulesPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '850px',
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '8px' }}>
            Règlement Officiel du Concours
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
            KevyLab Appathon • Édition Fondatrice 2026
          </p>
        </div>

        <a href="/KevyLab%20Platform%20Specification.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="sm">
            <Download size={14} />
            <span>Télécharger en PDF</span>
          </Button>
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <Card>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-primary)' }}>
            Article 1 — Objet du Concours
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '14px' }}>
            Le concours « KevyLab Appathon » est organisé par le laboratoire KevyLab afin d’identifier,
            d’évaluer et de valoriser des concepts d’applications logicielles utiles, pragmatiques et novatrices.
          </p>
        </Card>

        <Card>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-primary)' }}>
            Article 2 — Conditions d’Éligibilité
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '14px', marginBottom: '10px' }}>
            La participation est ouverte à toute personne physique majeure ou équipe composée de 2 à 5 membres.
            Chaque candidature doit proposer une idée d’application originale et non plagiée.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '14px' }}>
            Aucun prérequis de diplôme ou d’expérience professionnelle n’est exigé.
          </p>
        </Card>

        <Card>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-primary)' }}>
            Article 3 — Modalités d’Évaluation
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '14px', marginBottom: '10px' }}>
            L’évaluation des projets est réalisée par un jury technique selon un barème normatif de 100 points
            réparti sur 5 critères fondamentaux : Utilité (30 pts), Faisabilité (25 pts), Clarté MVP (20 pts),
            Potentiel de croissance (15 pts) et Originalité (10 pts).
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '14px' }}>
            Les délibérations et notes internes du jury sont confidentielles. Seuls les lauréats et distinctions
            officielles font l’objet d’une publication publique.
          </p>
        </Card>

        <Card>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-primary)' }}>
            Article 4 — Propriété Intellectuelle
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '14px' }}>
            Les candidats conservent l’entière propriété intellectuelle et les droits patrimoniaux relatifs à leurs
            idées, concepts et codes sources transmis. KevyLab s’engage à ne pas divulguer les détails techniques
            non publics sans accord écrit préalable.
          </p>
        </Card>
      </div>
    </div>
  );
};
