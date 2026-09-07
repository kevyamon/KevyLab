import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ============================================================================
 * KEVYLAB — PIED DE PAGE INSTITUTIONNEL (Footer)
 * ============================================================================
 * Présente l'identité du laboratoire, les raccourcis vers les sections clés
 * et les mentions légales sans aucune couleur codée en dur.
 * ============================================================================
 */

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: 'var(--color-bg-surface)',
        padding: '48px 24px 32px 24px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}
      >
        {/* Identité */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <img
              src="/kevylab-logo.png"
              alt="Logo KevyLab"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
                backgroundColor: '#ffffff',
                border: '1.5px solid var(--color-border-medium)',
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.2)',
                display: 'block'
              }}
            />
            <div style={{ fontSize: '18px', fontWeight: 800 }}>
              <span>Kevy</span>
              <span style={{ color: 'var(--color-accent-primary)' }}>Lab</span>
            </div>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
            Laboratoire d’innovation logicielle et d’ingénierie numérique fondé et piloté par Kevin Amon.
            Un espace d'expérimentation dédié à la conception de solutions durables, performantes et utiles.
          </p>
        </div>

        {/* Le Lab */}
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)', marginBottom: '14px' }}>
            Le Laboratoire
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            <li><Link to="/projets" style={{ color: 'var(--color-text-secondary)' }}>Portfolio des projets</Link></li>
            <li><Link to="/a-propos" style={{ color: 'var(--color-text-secondary)' }}>Vision & Philosophie</Link></li>
            <li><Link to="/contact" style={{ color: 'var(--color-text-secondary)' }}>Partenariats & Contact</Link></li>
          </ul>
        </div>

        {/* Événements */}
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)', marginBottom: '14px' }}>
            Événements
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            <li><Link to="/appathon" style={{ color: 'var(--color-text-secondary)' }}>KevyLab Appathon 2026</Link></li>
            <li><Link to="/appathon/participer" style={{ color: 'var(--color-text-secondary)' }}>Déposer une candidature</Link></li>
            <li><Link to="/appathon/reglement" style={{ color: 'var(--color-text-secondary)' }}>Règlement officiel</Link></li>
            <li><Link to="/appathon/resultats" style={{ color: 'var(--color-text-secondary)' }}>Lauréats & Résultats</Link></li>
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          © {new Date().getFullYear()} KevyLab — Conçu et développé par Kevin Amon. Tous droits réservés.
        </div>
        <div>
          Plateforme officielle d’ingénierie & d’innovation logicielle.
        </div>
      </div>
    </footer>
  );
};
