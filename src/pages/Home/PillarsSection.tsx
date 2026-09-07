import React from 'react';
import { Layers, Cpu, Code2, Rocket } from 'lucide-react';
import { Card } from '../../components/common/Card';

/**
 * ============================================================================
 * KEVYLAB — SECTION DES 4 PILIERS DU LABORATOIRE (PillarsSection)
 * ============================================================================
 * Expose les 4 axes fondamentaux : Conception de produits, Intelligence
 * artificielle, Ingénierie logicielle et Incubation d'idées.
 * ============================================================================
 */

export const PillarsSection: React.FC = () => {
  const pillars = [
    {
      icon: <Layers size={28} color="var(--color-accent-primary)" />,
      title: 'Conception de produits',
      description:
        'Développement d’applications web et mobiles modernes, centrées sur l’utilité réelle, l’ergonomie et la durabilité.'
    },
    {
      icon: <Cpu size={28} color="var(--color-status-review)" />,
      title: 'Intelligence artificielle',
      description:
        'Exploration et intégration de solutions d’IA appliquées, modèles génératifs et traitement intelligent des données.'
    },
    {
      icon: <Code2 size={28} color="var(--color-status-accepted)" />,
      title: 'Ingénierie logicielle',
      description:
        'Architecture système résiliente, prototypage rigoureux, sécurité renforcée et standards de production éprouvés.'
    },
    {
      icon: <Rocket size={28} color="var(--color-status-winner)" />,
      title: 'Incubation d’idées',
      description:
        'Transformation d’idées prometteuses en concepts structurés, puis en produits opérationnels déployés.'
    }
  ];

  return (
    <section
      style={{
        padding: '60px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            marginBottom: '12px'
          }}
        >
          Les Piliers du Laboratoire
        </h2>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            maxWidth: '560px',
            margin: '0 auto'
          }}
        >
          Une approche méthodique alliant exigence technique et vision produit à long terme.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}
      >
        {pillars.map((pillar, idx) => (
          <Card key={idx} hoverable>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              {pillar.icon}
            </div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '10px',
                color: 'var(--color-text-primary)'
              }}
            >
              {pillar.title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)'
              }}
            >
              {pillar.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
