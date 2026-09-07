import React, { useEffect, useState } from 'react';
import { KpiCard } from './KpiCard';
import { RecentSubmissionsTable } from './RecentSubmissionsTable';
import { apiClient } from '../../../api/client';
import { Users, Clock, CheckCircle, Trophy, MessageSquare, AlertCircle, FolderGit2 } from 'lucide-react';
import { useAdminAuthStore } from '../../../store/adminAuthStore';

/**
 * ============================================================================
 * KEVYLAB — VUE TABLEAU DE BORD ADMINISTRATEUR (AdminDashboardView)
 * ============================================================================
 * Vue synthétique des indicateurs clés (candidatures, statuts, projets, messages)
 * et raccourcis d'actions administratives.
 * ============================================================================
 */

export interface DashboardStats {
  submissions: {
    total: number;
    pending: number;
    reviewing: number;
    shortlisted: number;
    accepted: number;
    rejected: number;
    winners: number;
  };
  events: number;
  projects: number;
  unreadContacts: number;
  failedEmails: number;
  recentSubmissions: any[];
}

export const AdminDashboardView: React.FC = () => {
  const { setActiveTab } = useAdminAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<DashboardStats>('/admin/dashboard')
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ color: 'var(--color-text-muted)' }}>Chargement des indicateurs clés...</div>;
  }

  const sub = stats?.submissions || {
    total: 0,
    pending: 0,
    reviewing: 0,
    shortlisted: 0,
    accepted: 0,
    rejected: 0,
    winners: 0
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>Tableau de bord général</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Indicateurs de performance de l’Appathon 2026 et de l’écosystème KevyLab en temps réel.
        </p>
      </div>

      {/* Cartes KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KpiCard
          label="Total Candidatures"
          value={sub.total}
          icon={<Users size={22} color="var(--color-accent-primary)" />}
          colorVar="var(--color-accent-primary)"
        />
        <KpiCard
          label="En attente de revue"
          value={sub.pending}
          icon={<Clock size={22} color="var(--color-status-pending)" />}
          colorVar="var(--color-status-pending)"
        />
        <KpiCard
          label="Présélectionnées"
          value={sub.shortlisted}
          icon={<CheckCircle size={22} color="var(--color-status-shortlisted)" />}
          colorVar="var(--color-status-shortlisted)"
        />
        <KpiCard
          label="Lauréats"
          value={sub.winners}
          icon={<Trophy size={22} color="var(--color-status-winner)" />}
          colorVar="var(--color-status-winner)"
        />
      </div>

      {/* Indicateurs secondaires */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KpiCard
          label="Projets au Lab"
          value={stats?.projects || 0}
          icon={<FolderGit2 size={22} color="var(--color-text-primary)" />}
        />
        <KpiCard
          label="Nouveaux Contacts"
          value={stats?.unreadContacts || 0}
          icon={<MessageSquare size={22} color="var(--color-status-review)" />}
          colorVar="var(--color-status-review)"
        />
        <KpiCard
          label="Courriels échoués"
          value={stats?.failedEmails || 0}
          icon={<AlertCircle size={22} color="var(--color-status-rejected)" />}
          colorVar="var(--color-status-rejected)"
          subtext="Réessai possible via l’onglet dédié"
        />
      </div>

      {/* Actions rapides — Section 121 du Cahier des Charges */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: 'var(--color-bg-surface)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)'
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', marginRight: '8px' }}>
          Actions rapides :
        </span>

        <button
          onClick={() => setActiveTab('submissions')}
          style={{
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            color: 'var(--color-text-primary)',
            cursor: 'pointer'
          }}
        >
          Voir les candidatures
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          style={{
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            color: 'var(--color-text-primary)',
            cursor: 'pointer'
          }}
        >
          Gérer les projets
        </button>

        <button
          onClick={() => setActiveTab('events')}
          style={{
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            color: 'var(--color-text-primary)',
            cursor: 'pointer'
          }}
        >
          Modifier l’événement
        </button>

        <button
          onClick={() => setActiveTab('emails')}
          style={{
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            color: 'var(--color-text-primary)',
            cursor: 'pointer'
          }}
        >
          Voir les courriels échoués
        </button>
      </div>

      {/* Candidatures récentes */}
      <RecentSubmissionsTable
        submissions={stats?.recentSubmissions || []}
        onSelectSubmission={() => setActiveTab('submissions')}
      />
    </div>
  );
};
