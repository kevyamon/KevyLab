import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { Button } from '../../components/common/Button';

/**
 * ============================================================================
 * KEVYLAB — PAGE D'ERREUR 404 & LEURRE DE SÉCURITÉ FURTIVE
 * ============================================================================
 * Affichée pour toute URL introuvable ainsi que lors de toute tentative d'accès
 * direct aux chemins "/admin", "/dashboard", etc. pour une discrétion totale.
 * ============================================================================
 */

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px 24px'
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          color: 'var(--color-text-muted)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <Compass size={40} />
      </div>

      <h1
        style={{
          fontSize: '36px',
          fontWeight: 800,
          letterSpacing: '-1px',
          marginBottom: '12px'
        }}
      >
        Page introuvable
      </h1>

      <p
        style={{
          color: 'var(--color-text-secondary)',
          maxWidth: '460px',
          fontSize: '15px',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}
      >
        La page à laquelle vous tentez d’accéder n’existe pas, a été renommée ou n’est pas accessible publiquement.
      </p>

      <Link to="/">
        <Button variant="primary" size="md">
          <Home size={18} />
          <span>Retourner à l’accueil</span>
        </Button>
      </Link>
    </div>
  );
};
