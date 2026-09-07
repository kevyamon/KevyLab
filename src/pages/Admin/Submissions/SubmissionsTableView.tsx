import React, { useEffect, useState } from 'react';
import { ISubmission, SubmissionStatus } from '../../../types/contracts';
import { apiClient } from '../../../api/client';
import { SubmissionStatusFilter } from './SubmissionStatusFilter';
import { SubmissionsKanbanBoard } from './SubmissionsKanbanBoard';
import { SubmissionDetailPage } from './SubmissionDetailPage';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Search, Table, Kanban, RefreshCw } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — VUE MAÎTRESSE DES CANDIDATURES (SubmissionsTableView)
 * ============================================================================
 * Supporte l'affichage commutable Tableau / Kanban, la recherche textuelle
 * multicritères, le filtrage de statuts et l'ouverture de la fiche détaillée.
 * ============================================================================
 */

export const SubmissionsTableView: React.FC = () => {
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ISubmission | null>(null);
  const [viewMode, setViewMode] = useState<'TABLE' | 'KANBAN'>('TABLE');
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (statusFilter !== 'ALL') queryParams.append('status', statusFilter);
      if (searchQuery) queryParams.append('search', searchQuery);
      queryParams.append('limit', '100');

      const data = await apiClient.get<ISubmission[]>(`/admin/submissions?${queryParams.toString()}`);
      setSubmissions(data);
    } catch {
      // Gérer l'erreur silencieusement ou notification
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* En-tête et commutateur de vue */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>Gestion des Candidatures</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            Examinez, notez et pilotez le statut des projets soumis au concours.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button
            variant={viewMode === 'TABLE' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('TABLE')}
          >
            <Table size={14} />
            <span>Tableau</span>
          </Button>

          <Button
            variant={viewMode === 'KANBAN' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('KANBAN')}
          >
            <Kanban size={14} />
            <span>Kanban</span>
          </Button>

          <button
            onClick={fetchSubmissions}
            title="Rafraîchir les candidatures"
            style={{ padding: '8px', color: 'var(--color-text-muted)', cursor: 'pointer' }}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Barre d'outils : Recherche et Filtres */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '450px' }}>
            <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            <input
              type="text"
              placeholder="Rechercher par référence, nom, projet, pays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 36px',
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
          <Button variant="secondary" size="sm" type="submit">
            Rechercher
          </Button>
        </form>

        <SubmissionStatusFilter
          selectedStatus={statusFilter}
          onSelectStatus={(st) => setStatusFilter(st)}
        />
      </div>

      {/* Affichage des données selon le mode sélectionné */}
      {loading ? (
        <div style={{ color: 'var(--color-text-muted)', padding: '40px 0', textAlign: 'center', fontSize: '15px' }}>
          Chargement des données en cours...
        </div>
      ) : viewMode === 'KANBAN' ? (
        <SubmissionsKanbanBoard
          submissions={submissions}
          onSelectSubmission={(sub) => setSelectedSubmission(sub)}
          onStatusChange={() => fetchSubmissions()}
        />
      ) : (
        <Card style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Référence</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Candidat / Équipe</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Projet</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Pays</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Score</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Statut</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Aucune candidature ne correspond aux critères sélectionnés.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr
                    key={sub._id}
                    style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                  >
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--color-text-accent)' }}>
                      {sub.reference}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 600 }}>{sub.candidate.fullName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{sub.candidate.email}</div>
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--color-text-secondary)' }}>
                      {sub.project.title}
                    </td>
                    <td style={{ padding: '14px 20px' }}>{sub.candidate.country}</td>
                    <td style={{ padding: '14px 20px', fontWeight: 700 }}>
                      {sub.review?.totalScore !== undefined ? `${sub.review.totalScore}/100` : '—'}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: 'var(--color-bg-elevated)',
                          border: '1px solid var(--color-border-subtle)'
                        }}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        Examiner
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      )}

      {/* Modale de fiche détaillée de la candidature sélectionnée */}
      {selectedSubmission && (
        <SubmissionDetailPage
          submissionId={selectedSubmission._id}
          onClose={() => {
            setSelectedSubmission(null);
            fetchSubmissions();
          }}
        />
      )}
    </div>
  );
};
