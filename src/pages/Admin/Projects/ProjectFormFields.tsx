import React from 'react';
import { ProjectCategory, ProjectStatus } from '../../../types/contracts';

/**
 * ============================================================================
 * KEVYLAB — CHAMPS DU FORMULAIRE PROJET (ProjectFormFields)
 * ============================================================================
 * Regroupe les champs textuels et sélecteurs de métadonnées du projet
 * pour garantir la modularisation et le strict respect du plafond de 325 lignes.
 * ============================================================================
 */

export interface ProjectFormFieldsProps {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string;
  platforms: string;
  websiteUrl: string;
  githubUrl: string;
  inputStyle: React.CSSProperties;
  onNameChange: (val: string) => void;
  onSlugChange: (val: string) => void;
  onTaglineChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onProblemChange: (val: string) => void;
  onSolutionChange: (val: string) => void;
  onCategoryChange: (val: ProjectCategory) => void;
  onStatusChange: (val: ProjectStatus) => void;
  onTechnologiesChange: (val: string) => void;
  onPlatformsChange: (val: string) => void;
  onWebsiteUrlChange: (val: string) => void;
  onGithubUrlChange: (val: string) => void;
}

export const ProjectFormFields: React.FC<ProjectFormFieldsProps> = ({
  name,
  slug,
  tagline,
  description,
  problem,
  solution,
  category,
  status,
  technologies,
  platforms,
  websiteUrl,
  githubUrl,
  inputStyle,
  onNameChange,
  onSlugChange,
  onTaglineChange,
  onDescriptionChange,
  onProblemChange,
  onSolutionChange,
  onCategoryChange,
  onStatusChange,
  onTechnologiesChange,
  onPlatformsChange,
  onWebsiteUrlChange,
  onGithubUrlChange
}) => {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            Nom du projet *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ex: Pulse Care"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            Slug (URL)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="pulse-care"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
          Accroche courte (Tagline)
        </label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => onTaglineChange(e.target.value)}
          placeholder="Ex: Dispositif IoT d'alerte médicale d'urgence"
          style={inputStyle}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            Catégorie
          </label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as ProjectCategory)}
            style={inputStyle}
          >
            {Object.values(ProjectCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            Statut
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as ProjectStatus)}
            style={inputStyle}
          >
            {Object.values(ProjectStatus).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
          Description générale *
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          style={inputStyle}
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            Problème adressé
          </label>
          <textarea
            rows={2}
            value={problem}
            onChange={(e) => onProblemChange(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            Solution apportée
          </label>
          <textarea
            rows={2}
            value={solution}
            onChange={(e) => onSolutionChange(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            Technologies (séparées par virgule)
          </label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => onTechnologiesChange(e.target.value)}
            placeholder="TypeScript, React, Python..."
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            Plateformes (séparées par virgule)
          </label>
          <input
            type="text"
            value={platforms}
            onChange={(e) => onPlatformsChange(e.target.value)}
            placeholder="Web, iOS, Android..."
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            URL Site officiel
          </label>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => onWebsiteUrlChange(e.target.value)}
            placeholder="https://..."
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            URL GitHub
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => onGithubUrlChange(e.target.value)}
            placeholder="https://github.com/..."
            style={inputStyle}
          />
        </div>
      </div>
    </>
  );
};
