import React from 'react';

/**
 * ============================================================================
 * KEVYLAB — COMPOSANT BOUTON UNIFIÉ (Button)
 * ============================================================================
 * Bouton haut de gamme néo-moderne utilisant exclusivement les tokens CSS.
 * ============================================================================
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'var(--color-bg-elevated)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-medium)'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-subtle)'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid transparent'
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-status-rejected-bg)',
          color: 'var(--color-status-rejected)',
          border: '1px solid var(--color-status-rejected)'
        };
      default:
        return {
          backgroundColor: 'var(--color-accent-primary)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-accent-primary)',
          boxShadow: 'var(--shadow-glow)'
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '6px 12px', fontSize: '13px', borderRadius: 'var(--radius-sm)' };
      case 'lg':
        return { padding: '14px 28px', fontSize: '16px', borderRadius: 'var(--radius-md)' };
      default:
        return { padding: '10px 20px', fontSize: '14px', borderRadius: 'var(--radius-md)' };
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 600,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.6 : 1,
        transition: 'all var(--transition-fast)',
        outline: 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style
      }}
      {...props}
    >
      {isLoading ? <span>Chargement...</span> : children}
    </button>
  );
};
