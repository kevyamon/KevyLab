import React from 'react';
import { useApplicationFormStore, TeamMemberInput } from './applicationFormStore';
import { Button } from '../../components/common/Button';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — FORMULAIRE ÉTAPE 1 : CANDIDAT & ÉQUIPE
 * ============================================================================
 * Coordonnées complètes du candidat principal ou de l'équipe (membres, rôles).
 * ============================================================================
 */

export const StepTeamCandidate: React.FC = () => {
  const { formData, setField, setStep } = useApplicationFormStore();

  const handleAddMember = () => {
    const members = [...formData.teamMembers, { fullName: '', role: '', email: '' }];
    setField('teamMembers', members);
  };

  const handleUpdateMember = (index: number, key: keyof TeamMemberInput, val: string) => {
    const updated = [...formData.teamMembers];
    const member = updated[index];
    if (member) {
      member[key] = val;
      setField('teamMembers', updated);
    }
  };

  const handleRemoveMember = (index: number) => {
    const updated = formData.teamMembers.filter((_, i) => i !== index);
    setField('teamMembers', updated);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-bg-input)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    marginBottom: '6px'
  };

  return (
    <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Nom complet du responsable *</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setField('fullName', e.target.value)}
            placeholder="Ex. Alexandre Dupont"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Adresse courriel *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="alexandre@exemple.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Numéro de téléphone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setField('phone', e.target.value)}
            placeholder="+33 6 12 34 56 78"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Pays de résidence *</label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setField('country', e.target.value)}
            placeholder="France, Sénégal, Canada, etc."
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Ville</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setField('city', e.target.value)}
            placeholder="Paris, Dakar, Montréal..."
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Type de candidature *</label>
          <select
            value={formData.teamType}
            onChange={(e) => setField('teamType', e.target.value as 'SOLO' | 'TEAM')}
            style={inputStyle}
          >
            <option value="SOLO">Candidat individuel (Solo)</option>
            <option value="TEAM">Équipe (Collectif)</option>
          </select>
        </div>
      </div>

      {formData.teamType === 'TEAM' && (
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div>
            <label style={labelStyle}>Nom de l’équipe *</label>
            <input
              type="text"
              required={formData.teamType === 'TEAM'}
              value={formData.teamName}
              onChange={(e) => setField('teamName', e.target.value)}
              placeholder="Ex. Laboratoire Alpha"
              style={inputStyle}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Membres additionnels de l’équipe</span>
              <Button type="button" variant="outline" size="sm" onClick={handleAddMember}>
                <Plus size={14} />
                <span>Ajouter un membre</span>
              </Button>
            </div>

            {formData.teamMembers.map((member, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 2fr auto',
                  gap: '10px',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={member.fullName}
                  onChange={(e) => handleUpdateMember(idx, 'fullName', e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Rôle (ex. Lead Dev)"
                  value={member.role || ''}
                  onChange={(e) => handleUpdateMember(idx, 'role', e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Courriel"
                  value={member.email || ''}
                  onChange={(e) => handleUpdateMember(idx, 'email', e.target.value)}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMember(idx)}
                  style={{ color: 'var(--color-status-rejected)', padding: '6px' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button variant="primary" size="lg" type="submit">
          <span>Continuer vers le projet</span>
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
};
