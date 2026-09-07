import React from 'react';
import { useAdminAuthStore, AdminTab } from '../../store/adminAuthStore';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { LayoutDashboard, Users, Mail, MessageSquare, LogOut, X, Shield, FolderGit2, Trophy } from 'lucide-react';
import { AdminDashboardView } from './Dashboard/AdminDashboardView';
import { SubmissionsTableView } from './Submissions/SubmissionsTableView';
import { EmailLogsView } from './Emails/EmailLogsView';
import { ContactMessagesView } from './Contacts/ContactMessagesView';
import { ProjectsAdminView } from './Projects/ProjectsAdminView';
import { EventsAdminView } from './Events/EventsAdminView';

/**
 * ============================================================================
 * KEVYLAB — OVERLAY DE GESTION ADMINISTRATIVE (AdminManagerOverlay)
 * ============================================================================
 * Espace complet de pilotage staff sans exposition d'URL publique.
 * ============================================================================
 */

export const AdminManagerOverlay: React.FC = () => {
  const { isManagerOpen, closeManager, user, logout, activeTab, setActiveTab } = useAdminAuthStore();

  // Verrouillage du scroll de fond pendant l'affichage du cockpit staff
  useBodyScrollLock(isManagerOpen && Boolean(user));

  if (!isManagerOpen || !user) return null;

  const tabs: Array<{ id: AdminTab; label: string; icon: React.ReactNode }> = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={16} /> },
    { id: 'submissions', label: 'Candidatures (Table & Kanban)', icon: <Users size={16} /> },
    { id: 'projects', label: 'Projets du Lab', icon: <FolderGit2 size={16} /> },
    { id: 'events', label: 'Événements & Concours', icon: <Trophy size={16} /> },
    { id: 'emails', label: 'Journal des Courriels', icon: <Mail size={16} /> },
    { id: 'contacts', label: 'Messages de Contact', icon: <MessageSquare size={16} /> }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-bg-base)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Barre supérieure de l'espace staff */}
      <header
        style={{
          height: '64px',
          backgroundColor: 'var(--color-bg-surface)',
          borderBottom: '1px solid var(--color-border-subtle)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
            <Shield size={20} color="var(--color-accent-primary)" />
            <span>KevyLab <span style={{ color: 'var(--color-text-accent)' }}>Administration</span></span>
          </div>

          <nav style={{ display: 'flex', gap: '8px' }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 600,
                  backgroundColor: activeTab === t.id ? 'var(--color-accent-subtle)' : 'transparent',
                  color: activeTab === t.id ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
                  border: '1px solid',
                  borderColor: activeTab === t.id ? 'var(--color-border-accent)' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            {user.firstName} {user.lastName} ({user.role})
          </div>

          <button
            onClick={logout}
            title="Déconnexion"
            style={{
              padding: '8px',
              color: 'var(--color-status-rejected)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            <LogOut size={18} />
          </button>

          <button
            onClick={closeManager}
            title="Fermer l’espace de gestion"
            style={{
              padding: '8px',
              color: 'var(--color-text-muted)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Corps dynamique de l'espace d'administration */}
      <main style={{ flexGrow: 1, overflowY: 'auto', padding: '32px' }}>
        {activeTab === 'dashboard' && <AdminDashboardView />}
        {activeTab === 'submissions' && <SubmissionsTableView />}
        {activeTab === 'projects' && <ProjectsAdminView />}
        {activeTab === 'events' && <EventsAdminView />}
        {activeTab === 'emails' && <EmailLogsView />}
        {activeTab === 'contacts' && <ContactMessagesView />}
      </main>
    </div>
  );
};
