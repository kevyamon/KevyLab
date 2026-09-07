import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../api/client';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { RefreshCw, CheckCheck } from 'lucide-react';
import { ContactStatus, ContactType } from '../../../types/contracts';

/**
 * ============================================================================
 * KEVYLAB — VUE DES MESSAGES DE CONTACT ADMIN (ContactMessagesView)
 * ============================================================================
 * Liste et gestion des prises de contact (partenariats, presse, questions).
 * ============================================================================
 */

export interface ContactMessageItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  type: ContactType;
  message: string;
  status: ContactStatus;
  adminReplyNotes?: string;
  createdAt: string;
}

export const ContactMessagesView: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<ContactMessageItem[]>('/admin/contacts');
      setMessages(data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.patch(`/admin/contacts/${id}`, { status: ContactStatus.READ });
      fetchMessages();
    } catch {
      //
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>Messages de Contact Reçus</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            Consultez les demandes de partenariats, de presse et les messages généraux.
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={fetchMessages}>
          <RefreshCw size={14} />
          <span>Actualiser</span>
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {loading ? (
          <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '40px 0' }}>
            Chargement des messages...
          </div>
        ) : messages.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            Aucun message reçu pour le moment.
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg._id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-accent-subtle)',
                      color: 'var(--color-text-accent)'
                    }}
                  >
                    {msg.type}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>{msg.subject}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  <span>{new Date(msg.createdAt).toLocaleString('fr-FR')}</span>
                  {msg.status === ContactStatus.NEW && (
                    <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(msg._id)}>
                      <CheckCheck size={14} />
                      <span>Marquer comme lu</span>
                    </Button>
                  )}
                </div>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                De : <strong>{msg.name}</strong> ({msg.email})
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--color-text-primary)'
                }}
              >
                {msg.message}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
