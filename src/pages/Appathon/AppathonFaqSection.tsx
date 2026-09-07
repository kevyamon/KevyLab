import React, { useEffect, useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { apiClient } from '../../api/client';

/**
 * ============================================================================
 * KEVYLAB — FOIRE AUX QUESTIONS DU CONCOURS (AppathonFaqSection)
 * ============================================================================
 * Accordéon dynamique consommant les FAQs de l'événement (/events/:id/faqs)
 * avec ensemble de réponses de secours éprouvées pour l'édition 2026.
 * ============================================================================
 */

export interface FaqItemData {
  _id?: string;
  question: string;
  answer: string;
}

export interface AppathonFaqSectionProps {
  eventId?: string;
}

const fallbackFaqs: FaqItemData[] = [
  {
    question: 'Qui est éligible pour déposer une candidature ?',
    answer:
      'L’Appathon est ouvert à tous les profils : créateurs indépendants, étudiants, développeurs, designers ou équipes pluridisciplinaires. Il n’est pas nécessaire d’être un ingénieur chevronné : la pertinence du besoin résolu et la clarté de votre prototype MVP sont les critères déterminants.'
  },
  {
    question: 'Faut-il obligatoirement avoir déjà codé une application ?',
    answer:
      'Non. Bien qu’un prototype ou une maquette interactive constitue un atout appréciable, une spécification fonctionnelle limpide accompagnée d’une démonstration conceptuelle claire peut tout à fait être soumise et présélectionnée.'
  },
  {
    question: 'Est-il possible de participer en équipe ?',
    answer:
      'Tout à fait. Le formulaire de candidature vous permet de choisir entre une candidature « Solo » ou « Équipe ». En équipe, vous désignez un porteur de projet principal et pouvez renseigner les rôles et coordonnées de vos coéquipiers.'
  },
  {
    question: 'Comment est calculée la notation de mon projet ?',
    answer:
      'La notation repose sur un barème normatif et transparent de 100 points répartis sur 5 critères fondamentaux (Utilité 30 pts, Faisabilité 25 pts, Clarté MVP 20 pts, Potentiel de croissance 15 pts, Originalité 10 pts). Le score total est certifié côté serveur pour garantir une stricte impartialité.'
  },
  {
    question: 'Mes données et idées sont-elles protégées ?',
    answer:
      'Oui, rigoureusement. Vos coordonnées personnelles (téléphone, courriel) et les appréciations du jury demeurent strictement confidentielles et ne sont jamais publiées. Seuls les projets lauréats sont présentés au palmarès avec leur consentement explicite.'
  }
];

export const AppathonFaqSection: React.FC<AppathonFaqSectionProps> = ({ eventId }) => {
  const [faqs, setFaqs] = useState<FaqItemData[]>(fallbackFaqs);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!eventId) return;

    apiClient
      .get<FaqItemData[]>(`/events/${eventId}/faqs`)
      .then((data) => {
        if (data && data.length > 0) {
          setFaqs(data);
        }
      })
      .catch(() => {
        // En cas d'indisponibilité réseau, la liste par défaut reste active
      });
  }, [eventId]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Card>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <HelpCircle size={22} color="var(--color-accent-primary)" />
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
            Foire Aux Questions (FAQ)
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
          Retrouvez les réponses aux interrogations les plus fréquentes sur les modalités de sélection et d’accompagnement.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq._id || index}
              style={{
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-bg-surface)'
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--color-text-primary)'
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600 }}>
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp size={18} color="var(--color-text-accent)" />
                ) : (
                  <ChevronDown size={18} color="var(--color-text-muted)" />
                )}
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 20px 18px 20px',
                    color: 'var(--color-text-secondary)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    borderTop: '1px solid var(--color-border-subtle)'
                  }}
                >
                  <p style={{ marginTop: '14px' }}>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
