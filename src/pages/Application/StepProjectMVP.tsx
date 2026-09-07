import React from 'react';
import { useApplicationFormStore } from './applicationFormStore';
import { Button } from '../../components/common/Button';
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — FORMULAIRE ÉTAPE 2 : PROJET & SPÉCIFICATIONS MVP
 * ============================================================================
 * Description détaillée du problème, de la solution et liste des fonctionnalités.
 * ============================================================================
 */

export const StepProjectMVP: React.FC = () => {
  const { formData, setField, setStep } = useApplicationFormStore();

  const handleAddFeature = () => {
    setField('mvpFeatures', [...formData.mvpFeatures, '']);
  };

  const handleUpdateFeature = (index: number, val: string) => {
    const updated = [...formData.mvpFeatures];
    updated[index] = val;
    setField('mvpFeatures', updated);
  };

  const handleRemoveFeature = (index: number) => {
    const updated = formData.mvpFeatures.filter((_, i) => i !== index);
    setField('mvpFeatures', updated.length > 0 ? updated : ['']);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
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
      <div>
        <label style={labelStyle}>Intitulé du projet * (100 caractères max)</label>
        <input
          type="text"
          required
          maxLength={100}
          value={formData.projectTitle}
          onChange={(e) => setField('projectTitle', e.target.value)}
          placeholder="Ex. SmartLogistics Platform"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Phrase d’accroche / Tagline (160 caractères max)</label>
        <input
          type="text"
          maxLength={160}
          value={formData.tagline}
          onChange={(e) => setField('tagline', e.target.value)}
          placeholder="Une courte phrase percutante résumant la promesse du produit"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Quel problème précis souhaitez-vous résoudre ? * (2000 caractères max)</label>
        <textarea
          required
          rows={4}
          maxLength={2000}
          value={formData.problem}
          onChange={(e) => setField('problem', e.target.value)}
          placeholder="Exposez la douleur ou le besoin non satisfait observé sur le terrain..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div>
        <label style={labelStyle}>Pourquoi ce problème est-il important & urgent ?</label>
        <textarea
          rows={3}
          maxLength={2000}
          value={formData.problemImportance}
          onChange={(e) => setField('problemImportance', e.target.value)}
          placeholder="Expliquez l’impact financier, temporel ou humain de ce problème..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div>
        <label style={labelStyle}>Quelle est votre solution logicielle ? * (2000 caractères max)</label>
        <textarea
          required
          rows={4}
          maxLength={2000}
          value={formData.solution}
          onChange={(e) => setField('solution', e.target.value)}
          placeholder="Décrivez précisément le fonctionnement de votre solution..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div>
        <label style={labelStyle}>Public cible & Utilisateurs finaux * (1000 caractères max)</label>
        <input
          type="text"
          required
          maxLength={1000}
          value={formData.targetAudience}
          onChange={(e) => setField('targetAudience', e.target.value)}
          placeholder="Ex. PME industrielles, freelances tech, grand public urbain..."
          style={inputStyle}
        />
      </div>

      {/* Liste structurée des fonctionnalités MVP */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Fonctionnalités indispensables du MVP *</label>
          <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
            <Plus size={14} />
            <span>Ajouter une fonction</span>
          </Button>
        </div>

        {formData.mvpFeatures.map((feat, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)', width: '24px' }}>
              {idx + 1}.
            </span>
            <input
              type="text"
              required
              maxLength={250}
              placeholder="Ex. Tableau de bord analytique en temps réel"
              value={feat}
              onChange={(e) => handleUpdateFeature(idx, e.target.value)}
              style={inputStyle}
            />
            {formData.mvpFeatures.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFeature(idx)}
                style={{ color: 'var(--color-status-rejected)', padding: '6px' }}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Button variant="secondary" size="lg" type="button" onClick={() => setStep(1)}>
          <ArrowLeft size={18} />
          <span>Retour à l’étape 1</span>
        </Button>

        <Button variant="primary" size="lg" type="submit">
          <span>Continuer vers le profil technique</span>
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
};
