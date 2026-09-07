import React from 'react';
import { Trophy, Award, ExternalLink, Github, Sparkles, UserCheck } from 'lucide-react';
import { IPublicWinner } from '../../types/contracts';

/**
 * ============================================================================
 * KEVYLAB — CARTE DE PUBLICATION PRESTIGE DU LAURÉAT (LaureateCard)
 * ============================================================================
 * Présentation officielle et valorisante façon publication d'honneur :
 * photo portrait, fonction, nom, badge de distinction, projet et liens.
 * ============================================================================
 */

export interface LaureateCardProps {
  winner: IPublicWinner;
}

export const LaureateCard: React.FC<LaureateCardProps> = ({ winner }) => {
  const profile = winner.laureateProfile || {};
  const isFirst = profile.rank === 1;

  return (
    <article
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid',
        borderColor: isFirst ? 'var(--color-status-winner)' : 'var(--color-border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: isFirst ? '0 8px 32px rgba(234, 179, 8, 0.08)' : 'none',
        position: 'relative',
        transition: 'border-color var(--transition-fast)'
      }}
    >
      {/* En-tête type "Publication de distinction" */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Photo ou avatar du lauréat */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '2px solid',
              borderColor: isFirst ? 'var(--color-status-winner)' : 'var(--color-border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={winner.candidate.fullName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <UserCheck size={28} color="var(--color-text-accent)" />
            )}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {winner.candidate.fullName}
              </h3>
              {winner.candidate.teamType === 'TEAM' && winner.candidate.teamName && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-bg-elevated)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-subtle)'
                  }}
                >
                  Équipe : {winner.candidate.teamName}
                </span>
              )}
            </div>

            <div style={{ fontSize: '13px', color: 'var(--color-text-accent)', fontWeight: 600 }}>
              {profile.role || 'Porteur de Projet & Lauréat'} • {winner.candidate.country}
            </div>
          </div>
        </div>

        {/* Badge de distinction officiel */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isFirst ? 'var(--color-status-winner-bg)' : 'var(--color-accent-subtle)',
            border: '1px solid',
            borderColor: isFirst ? 'var(--color-status-winner)' : 'var(--color-border-accent)',
            fontSize: '12px',
            fontWeight: 800,
            color: isFirst ? 'var(--color-status-winner)' : 'var(--color-text-accent)'
          }}
        >
          {isFirst ? <Trophy size={14} /> : <Award size={14} />}
          <span>{profile.distinction || winner.ranking || 'Projet Primé'}</span>
        </div>
      </div>

      {/* Corps du projet primé */}
      <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={16} color="var(--color-accent-primary)" />
          <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {winner.project.title}
          </h4>
        </div>

        {winner.project.tagline && (
          <p style={{ fontSize: '14px', color: 'var(--color-text-accent)', fontWeight: 500, marginBottom: '10px' }}>
            « {winner.project.tagline} »
          </p>
        )}

        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '14px' }}>
          {profile.bio || winner.project.solution || 'Projet récompensé pour sa haute valeur ajoutée et son potentiel de développement.'}
        </p>

        {/* Liens du projet récompensé */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
          {winner.project.prototypeUrl && (
            <a
              href={winner.project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg-elevated)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              <span>Découvrir le prototype</span>
              <ExternalLink size={12} />
            </a>
          )}

          {winner.project.githubUrl && (
            <a
              href={winner.project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-bg-elevated)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              <Github size={12} />
              <span>Dépôt source</span>
            </a>
          )}

          <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
            Réf : {winner.reference}
          </div>
        </div>
      </div>
    </article>
  );
};
