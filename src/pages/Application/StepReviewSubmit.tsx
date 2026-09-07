import React, { useState } from 'react';
import { useApplicationFormStore } from './applicationFormStore';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { apiClient } from '../../api/client';
import { CheckCircle2, ArrowLeft, Send, AlertTriangle } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — FORMULAIRE ÉTAPE 4 : RÉCAPITULATIF & SOUMISSION OFFICIELLE
 * ============================================================================
 * Synthèse interactive avant confirmation, injection d'une clé d'idempotence
 * anti double-clic et affichage de la référence unique de dossier générée.
 * ============================================================================
 */

export interface StepReviewSubmitProps {
  eventId: string;
}

export const StepReviewSubmit: React.FC<StepReviewSubmitProps> = ({ eventId }) => {
  const { formData, setStep, resetForm } = useApplicationFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // Clé d'idempotence pour prémunir le serveur contre les soumissions accidentelles
    const idempotencyKey = `${formData.email.trim()}_${formData.projectTitle.trim()}_${Date.now()}`;

    const payload = {
      candidate: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        teamType: formData.teamType,
        teamName: formData.teamName,
        teamMembers: formData.teamMembers
      },
      project: {
        title: formData.projectTitle,
        tagline: formData.tagline,
        problem: formData.problem,
        problemImportance: formData.problemImportance,
        solution: formData.solution,
        targetAudience: formData.targetAudience,
        mvpFeatures: formData.mvpFeatures.filter((f) => f.trim() !== ''),
        prototypeExists: formData.prototypeExists,
        prototypeUrl: formData.prototypeUrl,
        githubUrl: formData.githubUrl
      },
      technicalProfile: {
        level: formData.technicalProfile,
        experience: formData.experience,
        technologies: formData.experience ? [formData.experience] : []
      },
      agreements: {
        accurateInformation: formData.agreeAccurate,
        acceptedRules: formData.agreeRules,
        consentContact: formData.agreeContact
      }
    };

    try {
      const response = await apiClient.post<{ reference: string; status: string }>(
        `/events/${eventId}/submissions`,
        payload,
        { 'X-Idempotency-Key': idempotencyKey }
      );

      setSubmittedReference(response.reference);
      resetForm();
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          'Une erreur est survenue lors de la transmission de votre candidature. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedReference) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px 24px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-status-accepted-bg)',
            color: 'var(--color-status-accepted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto'
          }}
        >
          <CheckCircle2 size={40} />
        </div>

        <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>
          Candidature envoyée avec succès !
        </h2>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
          Votre dossier a été enregistré sur les serveurs de KevyLab. Un courriel de confirmation
          récapitulatif vient de vous être envoyé.
        </p>

        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-accent)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            maxWidth: '380px',
            margin: '0 auto 32px auto'
          }}
        >
          <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            Référence officielle de votre dossier
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-text-accent)', letterSpacing: '1px' }}>
            {submittedReference}
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
          Conservez cette référence. Elle sera nécessaire pour suivre les résultats et échanger avec le jury.
        </p>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {errorMessage && (
        <div
          style={{
            backgroundColor: 'var(--color-status-rejected-bg)',
            border: '1px solid var(--color-status-rejected)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            color: 'var(--color-status-rejected)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px'
          }}
        >
          <AlertTriangle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Résumé Candidat */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>1. Candidat & Équipe</h3>
          <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
            Modifier
          </Button>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <div><strong>Nom :</strong> {formData.fullName}</div>
          <div><strong>Courriel :</strong> {formData.email}</div>
          <div><strong>Téléphone :</strong> {formData.phone}</div>
          <div><strong>Pays :</strong> {formData.country}</div>
          <div><strong>Type :</strong> {formData.teamType === 'TEAM' ? `Équipe (${formData.teamName})` : 'Solo'}</div>
        </div>
      </Card>

      {/* Résumé Projet */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>2. Projet & Spécifications MVP</h3>
          <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
            Modifier
          </Button>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div><strong>Titre :</strong> {formData.projectTitle}</div>
          <div><strong>Problème :</strong> {formData.problem.slice(0, 160)}...</div>
          <div><strong>Solution :</strong> {formData.solution.slice(0, 160)}...</div>
          <div><strong>Fonctions MVP :</strong> {formData.mvpFeatures.filter((f) => f).length} fonctionnalité(s) déclarée(s)</div>
        </div>
      </Card>

      {/* Résumé Profil Technique */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>3. Profil Technique</h3>
          <Button variant="ghost" size="sm" onClick={() => setStep(3)}>
            Modifier
          </Button>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <div><strong>Niveau :</strong> {formData.technicalProfile}</div>
          <div><strong>Prototype :</strong> {formData.prototypeExists ? 'Oui' : 'Non'}</div>
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Button variant="secondary" size="lg" onClick={() => setStep(3)}>
          <ArrowLeft size={18} />
          <span>Retour à l’étape 3</span>
        </Button>

        <Button variant="primary" size="lg" onClick={handleFinalSubmit} isLoading={isSubmitting}>
          <Send size={18} />
          <span>Soumettre définitivement ma candidature</span>
        </Button>
      </div>
    </div>
  );
};
