import React from 'react';
import { Card } from '../../../components/common/Card';

/**
 * ============================================================================
 * KEVYLAB — CARTE D'INDICATEUR CLÉ (KpiCard)
 * ============================================================================
 * Présentation visuelle d'un indicateur de performance clé (KPI).
 * ============================================================================
 */

export interface KpiCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  colorVar?: string;
  subtext?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  icon,
  colorVar = 'var(--color-accent-primary)',
  subtext
}) => {
  return (
    <Card style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </div>

      <div>
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          {label}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 800, color: colorVar, marginTop: '2px' }}>
          {value}
        </div>
        {subtext && (
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {subtext}
          </div>
        )}
      </div>
    </Card>
  );
};
