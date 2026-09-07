import React from 'react';

/**
 * ============================================================================
 * KEVYLAB — COMPOSANT CARTE UNIFIÉ (Card)
 * ============================================================================
 * Conteneur sobre et technologique utilisant le verre dépoli (glassmorphism)
 * et les frontières subtiles du design system.
 * ============================================================================
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        backdropFilter: 'blur(12px)',
        boxShadow: 'var(--shadow-md)',
        transition: 'border-color var(--transition-normal), transform var(--transition-normal)',
        ...(hoverable
          ? {
              cursor: 'pointer'
            }
          : {}),
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};
