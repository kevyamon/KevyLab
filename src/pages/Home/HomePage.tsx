import React, { useEffect, useState } from 'react';
import { HeroSection } from './HeroSection';
import { AppathonBanner } from './AppathonBanner';
import { PillarsSection } from './PillarsSection';
import { ShowcaseSection } from './ShowcaseSection';
import { apiClient } from '../../api/client';
import { IEvent, EventStatus } from '../../types/contracts';

/**
 * ============================================================================
 * KEVYLAB — PAGE D'ACCUEIL OFFICIELLE (HomePage)
 * ============================================================================
 * Orchestre les sections fondamentales du Lab et adapte dynamiquement
 * les bannières d'appel à l'action selon le statut réel renvoyé par l'API.
 * ============================================================================
 */

export const HomePage: React.FC = () => {
  const [isAppathonOpen, setIsAppathonOpen] = useState(true);

  useEffect(() => {
    // Vérification auprès du backend de l'état réel de l'Appathon
    apiClient
      .get<IEvent>('/events/active')
      .then((event) => {
        setIsAppathonOpen(event.status === EventStatus.APPLICATIONS_OPEN);
      })
      .catch(() => {
        setIsAppathonOpen(false);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <HeroSection isAppathonActive={isAppathonOpen} />
      <AppathonBanner isOpen={isAppathonOpen} />
      <PillarsSection />
      <ShowcaseSection />
    </div>
  );
};
