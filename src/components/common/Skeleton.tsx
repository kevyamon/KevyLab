import React from 'react';

/**
 * ============================================================================
 * KEVYLAB — COMPOSANTS DE CHARGEMENT SQUELETTE (Skeleton Loaders)
 * ============================================================================
 * Fournit des structures d'attente visuelles fluides avec effet de balayage
 * lumineux (shimmer) pour éliminer les sauts d'interface (CLS).
 * ============================================================================
 */

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  borderRadius = 'var(--radius-sm)',
  style,
  className = ''
}) => {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: 'var(--color-bg-elevated)',
        ...style
      }}
    />
  );
};

export const CardSkeleton: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        ...style
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton width="90px" height="22px" borderRadius="var(--radius-sm)" />
        <Skeleton width="60px" height="14px" />
      </div>
      <Skeleton width="75%" height="24px" style={{ margin: '4px 0' }} />
      <Skeleton width="100%" height="14px" />
      <Skeleton width="90%" height="14px" />
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <Skeleton width="70px" height="20px" borderRadius="var(--radius-sm)" />
        <Skeleton width="80px" height="20px" borderRadius="var(--radius-sm)" />
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 5 }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '16px',
        padding: '16px 20px',
        borderBottom: '1px solid var(--color-border-subtle)',
        alignItems: 'center'
      }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} height="14px" width={i === 0 ? '70%' : '85%'} />
      ))}
    </div>
  );
};
