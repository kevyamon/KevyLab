import { create } from 'zustand';
import { TechnicalProfileType } from '../../types/contracts';

/**
 * ============================================================================
 * KEVYLAB — MAGASIN D'ÉTAT DU FORMULAIRE DE CANDIDATURE (Store)
 * ============================================================================
 * Conserve temporairement les données de candidature saisies entre les étapes,
 * supporte le rechargement partiel et purge les données à la soumission.
 * ============================================================================
 */

export interface TeamMemberInput {
  fullName: string;
  role?: string;
  email?: string;
}

export interface ApplicationFormData {
  // Étape 1 — Candidat & Équipe
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  teamType: 'SOLO' | 'TEAM';
  teamName: string;
  teamMembers: TeamMemberInput[];

  // Étape 2 — Projet & Spécifications MVP
  projectTitle: string;
  tagline: string;
  problem: string;
  problemImportance: string;
  solution: string;
  targetAudience: string;
  mvpFeatures: string[];
  prototypeExists: boolean;
  prototypeUrl: string;
  githubUrl: string;

  // Étape 3 — Profil Technique & Engagements
  technicalProfile: TechnicalProfileType;
  experience: string;
  technologies: string[];
  agreeAccurate: boolean;
  agreeRules: boolean;
  agreeContact: boolean;
}

interface ApplicationFormStore {
  formData: ApplicationFormData;
  currentStep: number;
  setField: <K extends keyof ApplicationFormData>(field: K, value: ApplicationFormData[K]) => void;
  setStep: (step: number) => void;
  resetForm: () => void;
}

const STORAGE_KEY = 'kevylab_appathon_draft';

const defaultFormData: ApplicationFormData = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  teamType: 'SOLO',
  teamName: '',
  teamMembers: [],
  projectTitle: '',
  tagline: '',
  problem: '',
  problemImportance: '',
  solution: '',
  targetAudience: '',
  mvpFeatures: [''],
  prototypeExists: false,
  prototypeUrl: '',
  githubUrl: '',
  technicalProfile: TechnicalProfileType.BEGINNER,
  experience: '',
  technologies: [],
  agreeAccurate: false,
  agreeRules: false,
  agreeContact: false
};

// Chargement du brouillon depuis le stockage local
const loadInitialData = (): ApplicationFormData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultFormData, ...JSON.parse(saved) } : defaultFormData;
  } catch {
    return defaultFormData;
  }
};

export const useApplicationFormStore = create<ApplicationFormStore>((set) => ({
  formData: loadInitialData(),
  currentStep: 1,

  setField: (field, value) => {
    set((state) => {
      const updated = { ...state.formData, [field]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignorer en cas d'indisponibilité du localStorage
      }
      return { formData: updated };
    });
  },

  setStep: (step) => set({ currentStep: step }),

  resetForm: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignorer
    }
    set({ formData: defaultFormData, currentStep: 1 });
  }
}));
