import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowRight } from 'iconoir-react';
import { Card } from '../../components/common/Card';
import { ILabProject, ProjectCategory, formatProjectCategory } from '../../types/contracts';
import { apiClient } from '../../api/client';

/**
 * ============================================================================
 * KEVYLAB — PAGE PORTFOLIO DES PROJETS (/projets)
 * ============================================================================
 * Présente le catalogue technologique officiel avec filtres par catégories.
 * ============================================================================
 */

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ILabProject[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<ILabProject[]>('/projects')
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['ALL', ...Object.values(ProjectCategory)];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px 80px 24px'
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 800,
            letterSpacing: '-1px',
            marginBottom: '12px'
          }}
        >
          Portfolio Technologique
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', maxWidth: '600px' }}>
          Découvrez nos réalisations logicielles, prototypes fonctionnels et expérimentations en laboratoire.
        </p>
      </div>

      {/* Barre de filtres par catégorie */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '36px'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor:
                selectedCategory === cat
                  ? 'var(--color-accent-primary)'
                  : 'var(--color-border-subtle)',
              backgroundColor:
                selectedCategory === cat
                  ? 'var(--color-accent-subtle)'
                  : 'var(--color-bg-surface)',
              color:
                selectedCategory === cat
                  ? 'var(--color-text-accent)'
                  : 'var(--color-text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            {cat === 'ALL' ? 'Tous les projets' : formatProjectCategory(cat)}
          </button>
        ))}
      </div>

      {/* Liste des projets */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
          Chargement du catalogue en cours...
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Aucun projet n’est répertorié dans cette catégorie pour le moment.
          </p>
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredProjects.map((project) => (
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
                  <span
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
                    <Terminal width={14} height={14} strokeWidth={1.75} />
                    {formatProjectCategory(project.category)}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    {project.status}
                  </span>
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                  {project.name}
                </h2>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    flexGrow: 1
                  }}
                >
                  {project.tagline || project.description.slice(0, 140)}...
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
                  <span>Consulter la fiche</span>
                  <ArrowRight width={14} height={14} strokeWidth={1.75} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
