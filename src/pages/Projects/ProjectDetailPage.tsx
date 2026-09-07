import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Globe, AlertCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ILabProject, ProjectStatus } from '../../types/contracts';
import { apiClient } from '../../api/client';

/**
 * ============================================================================
 * KEVYLAB — PAGE DÉTAIL D'UN PROJET (/projets/:slug)
 * ============================================================================
 * Vue détaillée d'une réalisation : Problème, Solution, Technologies,
 * statut R&D et liens externes disponibles.
 * ============================================================================
 */

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ILabProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    apiClient
      .get<ILabProject>(`/projects/${slug}`)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ maxWidth: '900px', margin: '80px auto', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        Chargement des spécifications du projet...
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Projet introuvable</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          Ce projet n’existe pas ou n’a pas encore été publié.
        </p>
        <Link to="/projets">
          <Button variant="secondary">Retourner aux projets</Button>
        </Link>
      </div>
    );
  }

  const isRnD = project.status === ProjectStatus.RESEARCH || project.status === ProjectStatus.PROTOTYPE;

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '50px 24px 80px 24px'
      }}
    >
      <Link
        to="/projets"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
          fontWeight: 500,
          marginBottom: '32px'
        }}
      >
        <ArrowLeft size={16} />
        <span>Retour au catalogue</span>
      </Link>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent-primary)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            {project.category}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            Statut : {project.status}
          </span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>
          {project.name}
        </h1>

        {project.tagline && (
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            {project.tagline}
          </p>
        )}
      </div>

      {isRnD && (
        <div
          style={{
            backgroundColor: 'var(--color-status-review-bg)',
            border: '1px solid var(--color-status-review)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
            color: 'var(--color-text-primary)',
            fontSize: '14px'
          }}
        >
          <AlertCircle size={20} color="var(--color-status-review)" />
          <span>Projet en expérimentation active au laboratoire. Aucun lien de téléchargement public disponible.</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <Card>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Présentation générale</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            {project.description}
          </p>
        </Card>

        {project.problem && (
          <Card>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Le Problème adressé</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
              {project.problem}
            </p>
          </Card>
        )}

        {project.solution && (
          <Card>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>La Solution proposée</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
              {project.solution}
            </p>
          </Card>
        )}

        {/* Liens externes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
          {project.websiteUrl && (
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                <Globe size={16} />
                <span>Consulter le site officiel</span>
                <ExternalLink size={14} />
              </Button>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                <Github size={16} />
                <span>Code source</span>
                <ExternalLink size={14} />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
