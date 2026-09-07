import React, { useState } from 'react';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { Button } from '../../../components/common/Button';
import { AdminRegisterForm } from './AdminRegisterForm';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { X, Lock, KeyRound, ShieldAlert } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — MODALE D'AUTHENTIFICATION FURTIVE ADMIN
 * ============================================================================
 * Accessible uniquement après l'appui long de 10 secondes sur ScrollToTop.
 * Permet la connexion directe, l'inscription par clé secrète "ADMIN_PW",
 * et l'authentification officielle staff par Google OAuth 2.0.
 * ============================================================================
 */

const GoogleIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, loginWithGoogle } = useAdminAuthStore();
  const [tab, setTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  // Verrouillage systématique du défilement d'arrière-plan quand la modale est active
  useBodyScrollLock(isAuthModalOpen);

  // Formulaire de connexion
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await login(loginEmail, loginPassword);
    } catch (err: any) {
      setErrorMessage(err.message || 'Identifiants invalides.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    adminPw: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await register(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Échec de l’enregistrement. Clé ADMIN_PW invalide.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoading || isGoogleLoading) return;
    setIsGoogleLoading(true);
    setErrorMessage(null);
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        if (import.meta.env.DEV) {
          console.warn('[AdminAuth] VITE_GOOGLE_CLIENT_ID non configuré.');
        }
        setErrorMessage('L’authentification Google n’est pas disponible sur cet environnement. Veuillez utiliser vos identifiants staff.');
        setIsGoogleLoading(false);
        return;
      }
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
        (window as any).google.accounts.id.initialize({
          client_id: clientId,
          callback: async (res: any) => {
            if (res.credential) {
              try {
                await loginWithGoogle(res.credential);
              } catch (err: any) {
                setErrorMessage(err.message || 'Échec de la validation du compte Google Staff.');
              } finally {
                setIsGoogleLoading(false);
              }
            } else {
              setIsGoogleLoading(false);
            }
          }
        });
        (window as any).google.accounts.id.prompt((notification: any) => {
          if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
            setIsGoogleLoading(false);
          }
        });
      } else {
        setErrorMessage('Le service d’authentification Google est temporairement indisponible.');
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erreur lors de l’authentification Google.');
      setIsGoogleLoading(false);
    }
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

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-bg-overlay)',
        backdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* En-tête de la modale */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} color="var(--color-accent-primary)" />
            <span style={{ fontSize: '16px', fontWeight: 700 }}>Espace Staff KevyLab</span>
          </div>
          <button
            onClick={closeAuthModal}
            style={{ color: 'var(--color-text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Sélecteur d'onglets Connexion / Inscription */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-subtle)' }}>
          {(['LOGIN', 'REGISTER'] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setErrorMessage(null); }}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: tab === t ? 'var(--color-bg-elevated)' : 'transparent',
                color: tab === t ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                borderBottom: tab === t ? '2px solid var(--color-accent-primary)' : 'none'
              }}
            >
              {t === 'LOGIN' ? 'Connexion' : 'Inscription Staff'}
            </button>
          ))}
        </div>

        <div style={{ padding: '24px' }}>
          {errorMessage && (
            <div
              style={{
                backgroundColor: 'var(--color-status-rejected-bg)',
                border: '1px solid var(--color-status-rejected)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                color: 'var(--color-status-rejected)',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}
            >
              <ShieldAlert size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {tab === 'LOGIN' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                  Courriel administrateur
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@kevylab.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={inputStyle}
                />
              </div>

              <Button variant="primary" size="lg" type="submit" isLoading={isLoading} style={{ marginTop: '4px' }}>
                <KeyRound size={16} />
                <span>Accéder au Dashboard</span>
              </Button>
            </form>
          ) : (
            <AdminRegisterForm
              isLoading={isLoading}
              onSubmit={handleRegisterSubmit}
              inputStyle={inputStyle}
            />
          )}

          {/* Séparateur et Connexion Google Staff */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0 14px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>OU</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            style={{
              width: '100%',
              padding: '11px 16px',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-medium)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: (isLoading || isGoogleLoading) ? 'not-allowed' : 'pointer',
              opacity: (isLoading || isGoogleLoading) ? 0.65 : 1,
              pointerEvents: isGoogleLoading ? 'none' : 'auto',
              transition: 'all 0.2s ease'
            }}
          >
            {isGoogleLoading ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
                <span>Authentification en cours...</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span>Continuer avec Google Staff</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
