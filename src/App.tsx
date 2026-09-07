import React, { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';
import { AdminAuthModal } from './pages/Admin/Auth/AdminAuthModal';
import { AdminManagerOverlay } from './pages/Admin/AdminManagerOverlay';
import { HomePage } from './pages/Home/HomePage';
import { ProjectsPage } from './pages/Projects/ProjectsPage';
import { ProjectDetailPage } from './pages/Projects/ProjectDetailPage';
import { AboutPage } from './pages/About/AboutPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { AppathonPage } from './pages/Appathon/AppathonPage';
import { ApplicationWizardPage } from './pages/Application/ApplicationWizardPage';
import { AppathonRulesPage } from './pages/Appathon/AppathonRulesPage';
import { AppathonResultsPage } from './pages/Appathon/AppathonResultsPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { useAdminAuthStore } from './store/adminAuthStore';

/**
 * ============================================================================
 * KEVYLAB — COMPOSANT RACINE & ROUTAGE CENTRAL (App)
 * ============================================================================
 * Structure générale avec en-tête, pied de page, bouton ScrollToTop avec
 * déclencheur furtif, et leurre 404 strict sur /admin et /dashboard.
 * ============================================================================
 */

export const App: React.FC = () => {
  const { initAuth } = useAdminAuthStore();
  const { pathname } = useLocation();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Réinitialisation instantanée du sommet d'écran avant le rendu graphique (effet application mobile)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <Routes>
          {/* Routes Publiques du Laboratoire */}
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ProjectsPage />} />
          <Route path="/projets/:slug" element={<ProjectDetailPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Routes du KevyLab Appathon */}
          <Route path="/appathon" element={<AppathonPage />} />
          <Route path="/appathon/participer" element={<ApplicationWizardPage />} />
          <Route path="/appathon/reglement" element={<AppathonRulesPage />} />
          <Route path="/appathon/resultats" element={<AppathonResultsPage />} />

          {/* Leurre de sécurité furtive : /admin et /dashboard renvoient 404 */}
          <Route path="/admin" element={<NotFoundPage />} />
          <Route path="/admin/*" element={<NotFoundPage />} />
          <Route path="/dashboard" element={<NotFoundPage />} />
          <Route path="/dashboard/*" element={<NotFoundPage />} />

          {/* Route générique 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Bouton de retour en haut & Détecteur furtif de 10 secondes */}
      <ScrollToTopButton />

      {/* Modale d'authentification Staff & Overlay d'administration */}
      <AdminAuthModal />
      <AdminManagerOverlay />
    </div>
  );
};
