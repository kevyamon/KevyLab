import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { apiClient } from '../../../api/client';
import { ILabProject, ProjectCategory, ProjectStatus } from '../../../types/contracts';
import { ProjectImageUploader } from './ProjectImageUploader';
import { ProjectFormFields } from './ProjectFormFields';

/**
 * ============================================================================
 * KEVYLAB — MODALE D'ÉDITION & CRÉATION DE PROJET (ProjectModal)
 * ============================================================================
 * Formulaire staff pour créer ou mettre à jour un projet du laboratoire avec
 * téléversement Cloudinary direct via ProjectImageUploader (≤ 325 lignes).
 * ============================================================================
 */

export interface ProjectModalProps {
  project?: ILabProject | null;
  onClose: () => void;
  onSaved: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSaved }) => {
  const [name, setName] = useState(project?.name || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [tagline, setTagline] = useState(project?.tagline || '');
  const [description, setDescription] = useState(project?.description || '');
  const [problem, setProblem] = useState(project?.problem || '');
  const [solution, setSolution] = useState(project?.solution || '');
  const [category, setCategory] = useState<ProjectCategory>(project?.category || ProjectCategory.WEB);
  const [status, setStatus] = useState<ProjectStatus>(project?.status || ProjectStatus.IN_DEVELOPMENT);
  const [technologies, setTechnologies] = useState(project?.technologies?.join(', ') || '');
  const [platforms, setPlatforms] = useState(project?.platforms?.join(', ') || 'Web');
  const [websiteUrl, setWebsiteUrl] = useState(project?.websiteUrl || '');
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
  const [coverImageUrl, setCoverImageUrl] = useState(project?.coverImageUrl || '');
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!project) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError('Le nom et la description sont obligatoires.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().trim().replace(/\s+/g, '-'),
      tagline: tagline.trim(),
      description: description.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      category,
      status,
      technologies: technologies.split(',').map((t) => t.trim()).filter(Boolean),
      platforms: platforms.split(',').map((p) => p.trim()).filter(Boolean),
      websiteUrl: websiteUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      coverImageUrl: coverImageUrl.trim() || undefined,
      featured
    };

    try {
      if (project?._id) {
        await apiClient.patch(`/admin/projects/${project._id}`, payload);
      } else {
        await apiClient.post('/admin/projects', payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l’enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-bg-overlay)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '24px'
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
          {project ? 'Modifier le projet' : 'Créer un nouveau projet du Lab'}
        </h2>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--color-status-rejected-bg)',
              color: 'var(--color-status-rejected)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              marginBottom: '16px'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProjectFormFields
            name={name}
            slug={slug}
            tagline={tagline}
            description={description}
            problem={problem}
            solution={solution}
            category={category}
            status={status}
            technologies={technologies}
            platforms={platforms}
            websiteUrl={websiteUrl}
            githubUrl={githubUrl}
            inputStyle={inputStyle}
            onNameChange={handleNameChange}
            onSlugChange={setSlug}
            onTaglineChange={setTagline}
            onDescriptionChange={setDescription}
            onProblemChange={setProblem}
            onSolutionChange={setSolution}
            onCategoryChange={setCategory}
            onStatusChange={setStatus}
            onTechnologiesChange={setTechnologies}
            onPlatformsChange={setPlatforms}
            onWebsiteUrlChange={setWebsiteUrl}
            onGithubUrlChange={setGithubUrl}
          />

          {/* Téléversement et prévisualisation média Cloudinary */}
          <ProjectImageUploader
            imageUrl={coverImageUrl}
            onImageUploaded={(url) => setCoverImageUrl(url)}
            onImageRemoved={() => setCoverImageUrl('')}
            folder="projects"
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span>Mettre en avant ce projet dans le Showcase de l'accueil</span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Button variant="ghost" type="button" onClick={onClose} disabled={saving}>
              Annuler
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              <Check size={16} />
              <span>{saving ? 'Enregistrement...' : project ? 'Mettre à jour' : 'Créer le projet'}</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
