import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — BOUTON DE RETOUR HAUT DE PAGE & DÉCLENCHEUR FURTIF ADMIN
 * ============================================================================
 * Assure le défilement fluide vers le haut lors d'un clic normal.
 * Déclenche l'ouverture secrète de la modale d'administration après
 * un appui long ininterrompu de 10 secondes (10 000 ms).
 * ============================================================================
 */

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pressProgress, setPressProgress] = useState(0); // 0 à 100%
  const pressTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const isTriggeredRef = useRef(false);

  // Surveillance du défilement de page
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Début de l'appui (souris ou toucher tactile)
  const handlePressStart = () => {
    isTriggeredRef.current = false;
    startTimeRef.current = Date.now();

    const interval = window.setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsed / 10000) * 100, 100);
      setPressProgress(progress);

      // Déclenchement secret à 10 secondes révolues
      if (elapsed >= 10000 && !isTriggeredRef.current) {
        isTriggeredRef.current = true;
        window.clearInterval(interval);
        setPressProgress(0);
        startTimeRef.current = null;

        // Émission de l'événement furtif d'ouverture d'administration
        window.dispatchEvent(new CustomEvent('open-stealth-admin'));
      }
    }, 50);

    pressTimerRef.current = interval;
  };

  // Fin ou interruption de l'appui
  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      window.clearInterval(pressTimerRef.current);
      pressTimerRef.current = null;
    }

    const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    startTimeRef.current = null;
    setPressProgress(0);

    // Si l'appui était court (moins de 10s) et n'a pas déclenché l'admin, défilement vers le haut
    if (!isTriggeredRef.current && elapsed < 9500) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      aria-label="Retourner en haut de la page"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: '46px',
        height: '46px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-subtle)',
        color: 'var(--color-text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 999,
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {/* Cercle subtil de progression de l'appui long */}
      {pressProgress > 0 && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'rotate(-90deg)',
            pointerEvents: 'none'
          }}
        >
          <circle
            cx="23"
            cy="23"
            r="21"
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth="2"
            strokeDasharray={132}
            strokeDashoffset={132 - (132 * pressProgress) / 100}
            style={{ transition: 'stroke-dashoffset 50ms linear' }}
          />
        </svg>
      )}
      <ArrowUp size={20} />
    </button>
  );
};
