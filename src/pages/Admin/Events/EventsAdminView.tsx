import React, { useEffect, useState } from 'react';
import { Trophy, AlertCircle, RefreshCw, Send } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { apiClient } from '../../../api/client';
import { IEvent, EventStatus, IEvaluationCriterion } from '../../../types/contracts';

/**
 * ============================================================================
 * KEVYLAB — VUE D'ADMINISTRATION DE L'ÉVÉNEMENT (EventsAdminView)
 * ============================================================================
 * Pilotage de l'Appathon actif : ouverture/fermeture des candidatures,
 * dates jalons, critères de notation sur 100 pts et proclamation des résultats.
 * ============================================================================
 */

export const EventsAdminView: React.FC = () => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [criteria, setCriteria] = useState<IEvaluationCriterion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchEventData = async () => {
    setLoading(true);
    try {
      const active = await apiClient.get<IEvent>('/events/active');
      setEvent(active);
      if (active?._id) {
        const crit = await apiClient.get<IEvaluationCriterion[]>(`/events/${active._id}/evaluation-criteria`).catch(() => []);
        setCriteria(crit || []);
      }
    } catch {
      setMessage({ text: 'Impossible de charger l’événement actif.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleStatusChange = async (newStatus: EventStatus) => {
    if (!event?._id) return;
    setSaving(true);
    try {
      const updated = await apiClient.patch<IEvent>(`/admin/events/${event._id}`, { status: newStatus });
      setEvent(updated);
      setMessage({ text: `Statut mis à jour : ${newStatus}`, type: 'success' });
    } catch (err) {
      setMessage({ text: err instanceof Error ? err.message : 'Erreur de mise à jour', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handlePublishResults = async () => {
    if (!event?._id) return;
    const confirm = window.confirm(
      '⚠️ Attention : La publication des résultats va rendre publics les projets lauréats sur la page /appathon/resultats et notifier les candidats. Voulez-vous continuer ?'
    );
    if (!confirm) return;

    setSaving(true);
    try {
      const updated = await apiClient.post<IEvent>(`/admin/events/${event._id}/publish-results`, {});
      setEvent(updated);
      setMessage({ text: 'Résultats officiellement proclamés et publiés !', type: 'success' });
    } catch (err) {
      setMessage({ text: err instanceof Error ? err.message : 'Échec de publication', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const totalCriteriaPoints = criteria.reduce((sum, c) => sum + (c.maxScore || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>
            Pilotage de l’Appathon 2026
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            Contrôlez les états du concours, les dates butoirs et la proclamation du palmarès.
          </p>
        </div>

        <button
          onClick={fetchEventData}
          title="Rafraîchir"
          style={{ padding: '8px', color: 'var(--color-text-muted)', cursor: 'pointer' }}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: message.type === 'success' ? 'var(--color-accent-subtle)' : 'var(--color-status-rejected-bg)',
            color: message.type === 'success' ? 'var(--color-text-accent)' : 'var(--color-status-rejected)',
            fontSize: '13px'
          }}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
          Chargement de l'événement...
        </div>
      ) : !event ? (
        <Card style={{ textAlign: 'center', padding: '40px 24px' }}>
          <AlertCircle size={32} color="var(--color-status-pending)" style={{ margin: '0 auto 12px auto' }} />
          <p>Aucun événement Appathon actif n’a été détecté.</p>
        </Card>
      ) : (
        <>
          {/* Carte statut et actions principales */}
          <Card>
            <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} color="var(--color-accent-primary)" />
              <span>Statut Actuel du Concours</span>
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
              {Object.values(EventStatus).map((st) => (
                <button
                  key={st}
                  disabled={saving}
                  onClick={() => handleStatusChange(st)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: event.status === st ? 'var(--color-accent-primary)' : 'var(--color-border-subtle)',
                    backgroundColor: event.status === st ? 'var(--color-accent-subtle)' : 'var(--color-bg-elevated)',
                    color: event.status === st ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Proclamation des résultats */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: '20px'
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>
                  Publication officielle des lauréats :{' '}
                  <span style={{ color: event.resultsPublished ? 'var(--color-status-accepted)' : 'var(--color-text-muted)' }}>
                    {event.resultsPublished ? 'Publiée sur le site' : 'Non publiée (Confidentielle)'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Rend visible les cartes lauréats sur /appathon/resultats
                </div>
              </div>

              <Button
                variant={event.resultsPublished ? 'secondary' : 'primary'}
                size="sm"
                onClick={handlePublishResults}
                disabled={saving}
              >
                <Send size={14} />
                <span>{event.resultsPublished ? 'Résultats déjà proclamés' : 'Proclamer les résultats'}</span>
              </Button>
            </div>
          </Card>

          {/* Grille des critères officiels */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>
                  Critères d'Évaluation de l'Édition
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  La somme totale doit être strictement égale à 100 points.
                </p>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: totalCriteriaPoints === 100 ? 'var(--color-accent-subtle)' : 'var(--color-status-rejected-bg)',
                  color: totalCriteriaPoints === 100 ? 'var(--color-text-accent)' : 'var(--color-status-rejected)'
                }}
              >
                Total : {totalCriteriaPoints} / 100 pts
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {criteria.map((c, i) => (
                <div
                  key={c.key || i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border-subtle)'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{c.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-accent-primary)' }}>
                    {c.maxScore} pts
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
