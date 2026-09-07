import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { ILabProject } from '../../types/contracts';
import { apiClient } from '../../api/client';

/**
 * ============================================================================
 * KEVYLAB — SECTION VITRINE PROJETS (ShowcaseSection)
 * ============================================================================
 * Présente une sélection authentique des projets et prototypes du laboratoire.
 * ============================================================================
 */

export const ShowcaseSection: React.FC = () => {
  const [projects, setProjects] = useState<ILabProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<ILabProject[]>('/projects')
      .then((data) => {
        setProjects(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (!loading && projects.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        padding: '60px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '36px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--color-text-accent)',
              marginBottom: '6px'
            }}
          >
            Vitrine Technologique
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            Projets & Expérimentations
          </h2>
        </div>

        <Link
          to="/projets"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-text-accent)'
          }}
        >
          <span>Voir tout le catalogue</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}
      >
        {projects.map((project) => (
          <Link to={`/projets/${project.slug}`} key={project._id}>
            <Card hoverable style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--color-accent-primary)',
                    backgroundColor: 'var(--color-accent-subtle)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <Terminal size={12} />
                  <span>{project.category}</span>
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    fontWeight: 500
                  }}
                >
                  {project.status}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                {project.name}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '20px',
                  flexGrow: 1
                }}
              >
                {project.tagline || project.description.slice(0, 120)}...
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)'
                }}
              >
                <span>Explorer la fiche</span>
                <ArrowRight size={14} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
