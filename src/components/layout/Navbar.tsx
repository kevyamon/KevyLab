import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — BARRE DE NAVIGATION PUBLIQUE (Navbar)
 * ============================================================================
 * En-tête responsive haut de gamme avec navigation fluide et mise en avant
 * discrète de l'Appathon actif. Conforme aux tokens CSS sans couleur en dur.
 * ============================================================================
 */

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-bg-overlay)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border-subtle)',
        width: '100%'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo de la marque */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.5px'
          }}
        >
          <span>Kevy</span>
          <span style={{ color: 'var(--color-accent-primary)' }}>Lab</span>
        </Link>

        {/* Navigation Desktop */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
        >
          <Link
            to="/projets"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: isActive('/projets') ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderBottom: isActive('/projets') ? '2px solid var(--color-accent-primary)' : 'none',
              paddingBottom: '4px'
            }}
          >
            Projets
          </Link>

          <Link
            to="/a-propos"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: isActive('/a-propos') ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderBottom: isActive('/a-propos') ? '2px solid var(--color-accent-primary)' : 'none',
              paddingBottom: '4px'
            }}
          >
            À propos
          </Link>

          <Link
            to="/appathon"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: isActive('/appathon') ? 'var(--color-text-accent)' : 'var(--color-text-primary)',
              backgroundColor: 'var(--color-accent-subtle)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border-accent)'
            }}
          >
            <Sparkles size={14} color="var(--color-accent-primary)" />
            <span>Appathon 2026</span>
          </Link>

          <Link
            to="/contact"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: isActive('/contact') ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderBottom: isActive('/contact') ? '2px solid var(--color-accent-primary)' : 'none',
              paddingBottom: '4px'
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Bouton Menu Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Ouvrir le menu"
          style={{
            display: 'none',
            color: 'var(--color-text-primary)',
            padding: '8px'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Volet Menu Mobile */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderBottom: '1px solid var(--color-border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <Link to="/projets" onClick={() => setIsMobileMenuOpen(false)}>Projets</Link>
          <Link to="/a-propos" onClick={() => setIsMobileMenuOpen(false)}>À propos</Link>
          <Link to="/appathon" onClick={() => setIsMobileMenuOpen(false)}>Appathon 2026</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
};
