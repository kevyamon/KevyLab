import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../api/client';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { RefreshCw, RotateCcw, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — JOURNAL DES NOTIFICATIONS PAR COURRIEL (EmailLogsView)
 * ============================================================================
 * Visualise l'ensemble des courriels transactionnels Brevo avec statut d'envoi
 * et bouton de réessai en cas d'échec temporaire.
 * ============================================================================
 */

export interface EmailLogEntry {
  _id: string;
  recipient: string;
  templateKey: string;
  status: 'PENDING' | 'SENT' | 'FAILED';
  retryCount: number;
  errorCode?: string;
  sentAt?: string;
  createdAt: string;
}

export const EmailLogsView: React.FC = () => {
  const [logs, setLogs] = useState<EmailLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<EmailLogEntry[]>('/admin/email-logs');
      setLogs(data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleRetry = async (logId: string) => {
    setRetryingId(logId);
    try {
      await apiClient.post(`/admin/email-logs/${logId}/retry`);
      await fetchLogs();
    } catch {
      //
    } finally {
      setRetryingId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>Journal des Courriels Transactionnels</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            Traçabilité des notifications émises via Brevo et gestion des réessais en cas d’anomalie réseau.
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={fetchLogs}>
          <RefreshCw size={14} />
          <span>Actualiser le journal</span>
        </Button>
      </div>

      <Card style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>Destinataire</th>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>Modèle / Événement</th>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>Statut</th>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>Tentatives</th>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>Horodatage</th>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Chargement des journaux de courriels...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Aucun courriel journalisé.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {log.recipient}
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--color-text-secondary)' }}>
                    {log.templateKey}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor:
                          log.status === 'SENT'
                            ? 'var(--color-status-accepted-bg)'
                            : log.status === 'FAILED'
                            ? 'var(--color-status-rejected-bg)'
                            : 'var(--color-bg-elevated)',
                        color:
                          log.status === 'SENT'
                            ? 'var(--color-status-accepted)'
                            : log.status === 'FAILED'
                            ? 'var(--color-status-rejected)'
                            : 'var(--color-status-pending)'
                      }}
                    >
                      {log.status === 'SENT' && <CheckCircle2 size={12} />}
                      {log.status === 'FAILED' && <AlertCircle size={12} />}
                      {log.status === 'PENDING' && <Clock size={12} />}
                      <span>{log.status}</span>
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>{log.retryCount}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--color-text-muted)' }}>
                    {new Date(log.createdAt).toLocaleString('fr-FR')}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {log.status === 'FAILED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRetry(log._id)}
                        isLoading={retryingId === log._id}
                      >
                        <RotateCcw size={12} />
                        <span>Réessayer</span>
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
