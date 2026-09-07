import { useEffect } from 'react';

/**
 * ============================================================================
 * KEVYLAB — HOOK DE VERROUILLAGE DU DÉFILEMENT (useBodyScrollLock)
 * ============================================================================
 * Empêche tout défilement d'arrière-plan (molette, barre de défilement,
 * pavé tactile et gestes tactiles) sur le corps de la page lorsqu'une
 * modale ou un calque d'overlay est ouvert.
 * Restaure l'état initial des éléments lors de la fermeture ou du démontage.
 * ============================================================================
 */
export const useBodyScrollLock = (isLocked: boolean): void => {
  useEffect(() => {
    if (!isLocked || typeof document === 'undefined') {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isLocked]);
};
