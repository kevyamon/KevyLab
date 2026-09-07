import React from 'react';
import { useApplicationFormStore } from './applicationFormStore';
import { Button } from '../../components/common/Button';
import { TechnicalProfileType } from '../../types/contracts';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — FORMULAIRE ÉTAPE 3 : PROFIL TECHNIQUE & ENGAGEMENTS
 * ============================================================================
 * Profil de l'équipe, maturité du prototype et acceptation formelle du règlement.
 * ============================================================================
 */

export const StepTechnicalProfile: React.FC = () => {
  const { formData, setField, setStep } = useApplicationFormStore();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeRules) {
      alert('Vous devez obligatoirement accepter le règlement du concours pour candidater.');
      return;
    }
    setStep(4);
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
          <label style={labelStyle}>Niveau de profil technique *</label>
          <select
            value={formData.technicalProfile}
            onChange={(e) => setField('technicalProfile', e.target.value as TechnicalProfileType)}
            style={inputStyle}
          >
            <option value={TechnicalProfileType.NON_TECHNICAL}>Profil non technique / Porteur de projet</option>
            <option value={TechnicalProfileType.BEGINNER}>Débutant en programmation</option>
            <option value={TechnicalProfileType.DEVELOPER}>Développeur / Ingénieur logiciel</option>
            <option value={TechnicalProfileType.DESIGNER}>Designer UI/UX & Produit</option>
            <option value={TechnicalProfileType.MIXED_TEAM}>Équipe mixte (Dev, Design, Produit)</option>
            <option value={TechnicalProfileType.OTHER}>Autre profil</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Un prototype fonctionnel existe-t-il ?</label>
          <select
            value={formData.prototypeExists ? 'YES' : 'NO'}
            onChange={(e) => setField('prototypeExists', e.target.value === 'YES')}
            style={inputStyle}
          >
            <option value="NO">Non (Idée ou concept uniquement)</option>
            <option value="YES">Oui (Prototype, maquette ou MVP amorcé)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Lien vers le prototype (si existant)</label>
          <input
            type="url"
            value={formData.prototypeUrl}
            onChange={(e) => setField('prototypeUrl', e.target.value)}
            placeholder="https://mon-prototype.app ou lien Figma"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Lien du dépôt GitHub / GitLab (facultatif)</label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setField('githubUrl', e.target.value)}
            placeholder="https://github.com/mon-organisation/projet"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Technologies envisagées ou maîtrisées</label>
        <input
          type="text"
          value={formData.experience}
          onChange={(e) => setField('experience', e.target.value)}
          placeholder="Ex. React, Node.js, Python, Flutter, PostgreSQL..."
          style={inputStyle}
        />
      </div>

      {/* Engagements et Consentements formels */}
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Engagements & Consentements légaux
        </span>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            required
            checked={formData.agreeAccurate}
            onChange={(e) => setField('agreeAccurate', e.target.checked)}
            style={{ marginTop: '3px' }}
          />
          <span style={{ color: 'var(--color-text-secondary)' }}>
            Je certifie sur l’honneur que l’ensemble des informations fournies sont exactes et sincères. *
          </span>
        </label>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            required
            checked={formData.agreeRules}
            onChange={(e) => setField('agreeRules', e.target.checked)}
            style={{ marginTop: '3px' }}
          />
          <span style={{ color: 'var(--color-text-secondary)' }}>
            J’accepte sans réserve les termes du règlement officiel de l’Appathon 2026. *
          </span>
        </label>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            required
            checked={formData.agreeContact}
            onChange={(e) => setField('agreeContact', e.target.checked)}
            style={{ marginTop: '3px' }}
          />
          <span style={{ color: 'var(--color-text-secondary)' }}>
            J’autorise l’équipe de KevyLab à me contacter par courriel ou téléphone au sujet de cette candidature. *
          </span>
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Button variant="secondary" size="lg" type="button" onClick={() => setStep(2)}>
          <ArrowLeft size={18} />
          <span>Retour à l’étape 2</span>
        </Button>

        <Button variant="primary" size="lg" type="submit">
          <span>Accéder au récapitulatif</span>
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
};
