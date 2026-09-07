import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, RefreshCw, FolderGit2 } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { apiClient } from '../../../api/client';
import { ILabProject, ProjectCategory, ProjectStatus } from '../../../types/contracts';
import { ProjectModal } from './ProjectModal';

/**
 * ============================================================================
 * KEVYLAB — VUE D'ADMINISTRATION DES PROJETS (ProjectsAdminView)
 * ============================================================================
 * Espace complet de gestion du portfolio technologique : création, édition,
 * statut R&D, filtres et suppression pour le staff.
 * ============================================================================
 */

export const ProjectsAdminView: React.FC = () => {
  const [projects, setProjects] = useState<ILabProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<ILabProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<ILabProject[]>('/admin/projects');
      setProjects(data || []);
    } catch {
      // Fallback
      const pubData = await apiClient.get<ILabProject[]>('/projects').catch(() => []);
      setProjects(pubData || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Confirmez-vous la suppression du projet « ${name} » ?`)) return;

    try {
      await apiClient.delete(`/admin/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Échec de la suppression');
    }
  };

  const handleEdit = (project: ILabProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* En-tête de gestion des projets */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>
            Gestion des Projets du Laboratoire
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            Administrez les réalisations, prototypes d’ingénierie et initiatives en R&D.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={fetchProjects}
            title="Rafraîchir la liste"
            style={{ padding: '8px', color: 'var(--color-text-muted)', cursor: 'pointer' }}
          >
            <RefreshCw size={16} />
          </button>
          <Button variant="primary" size="sm" onClick={handleCreateNew}>
            <Plus size={16} />
            <span>Nouveau projet</span>
          </Button>
        </div>
      </div>

      {/* Barre d'outils et de recherche */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
          <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: '9px 12px',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-text-primary)',
            fontSize: '13px',
            outline: 'none'
          }}
        >
          <option value="ALL">Toutes catégories</option>
          {Object.values(ProjectCategory).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau des projets */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
          Chargement des projets...
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
          <FolderGit2 size={32} color="var(--color-text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            Aucun projet répertorié selon les critères sélectionnés.
          </p>
        </Card>
      ) : (
        <Card style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Nom</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Catégorie</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Statut</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Plateformes</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Showcase</th>
                <th style={{ padding: '12px 20px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => (
                <tr key={p._id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>/{p.slug}</div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-accent-primary)', fontWeight: 600 }}>
                      {p.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border-subtle)'
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--color-text-secondary)' }}>
                    {p.platforms?.join(', ') || 'Web'}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {p.featured ? (
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-status-accepted)' }}>
                        Mis en avant
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(p)}
                        title="Modifier"
                        style={{ padding: '6px', color: 'var(--color-text-primary)', cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
                        title="Supprimer"
                        style={{ padding: '6px', color: 'var(--color-status-rejected)', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Modale d'édition / création */}
      {isModalOpen && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setIsModalOpen(false)}
          onSaved={() => fetchProjects()}
        />
      )}
    </div>
  );
};
