import { create } from 'zustand';
import { IAdminUser } from '../types/contracts';
import { apiClient } from '../api/client';

/**
 * ============================================================================
 * KEVYLAB — MAGASIN D'ÉTAT DE L'ADMINISTRATION FURTIVE (AdminAuthStore)
 * ============================================================================
 * Gère la session staff, l'écouteur secret 'open-stealth-admin' et l'affichage
 * de l'overlay de gestion administrative en lieu et place de routes publiques.
 * ============================================================================
 */

export type AdminTab = 'dashboard' | 'submissions' | 'projects' | 'events' | 'emails' | 'contacts';

interface AdminAuthStore {
  user: IAdminUser | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  isManagerOpen: boolean;
  activeTab: AdminTab;

  openAuthModal: () => void;
  closeAuthModal: () => void;
  openManager: () => void;
  closeManager: () => void;
  setActiveTab: (tab: AdminTab) => void;

  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string; adminPw: string }) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAdminAuthStore = create<AdminAuthStore>((set, get) => {
  // Écoute de l'événement secret déclenché par l'appui long de 10s sur le bouton ScrollToTop
  if (typeof window !== 'undefined') {
    window.addEventListener('open-stealth-admin', () => {
      const state = get();
      if (state.isAuthenticated) {
        set({ isManagerOpen: true });
      } else {
        set({ isAuthModalOpen: true });
      }
    });
  }

  return {
    user: null,
    isAuthenticated: false,
    isAuthModalOpen: false,
    isManagerOpen: false,
    activeTab: 'dashboard',

    openAuthModal: () => set({ isAuthModalOpen: true }),
    closeAuthModal: () => set({ isAuthModalOpen: false }),
    openManager: () => set({ isManagerOpen: true }),
    closeManager: () => set({ isManagerOpen: false }),
    setActiveTab: (activeTab) => set({ activeTab }),

    login: async (email, password) => {
      const res = await apiClient.post<{ user: IAdminUser; accessToken: string }>('/admin/auth/login', {
        email,
        password
      });
      apiClient.setToken(res.accessToken);
      set({ user: res.user, isAuthenticated: true, isAuthModalOpen: false, isManagerOpen: true });
    },

    register: async (data) => {
      const res = await apiClient.post<{ user: IAdminUser; accessToken: string }>('/admin/auth/register', data);
      apiClient.setToken(res.accessToken);
      set({ user: res.user, isAuthenticated: true, isAuthModalOpen: false, isManagerOpen: true });
    },

    logout: async () => {
      await apiClient.post('/admin/auth/logout').catch(() => {});
      apiClient.setToken(null);
      set({ user: null, isAuthenticated: false, isManagerOpen: false, isAuthModalOpen: false });
    },

    initAuth: async () => {
      const token = apiClient.getToken();
      if (!token) return;
      try {
        const res = await apiClient.get<{ admin: IAdminUser }>('/admin/auth/me');
        set({ user: res.admin, isAuthenticated: true });
      } catch {
        apiClient.setToken(null);
        set({ user: null, isAuthenticated: false });
      }
    }
  };
});
