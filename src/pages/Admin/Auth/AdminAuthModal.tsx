import React, { useState, useEffect } from 'react';
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
 * Permet la connexion directe, l'inscription par code d'autorisation staff,
 * et l'authentification officielle staff par Google OAuth 2.0 (GIS natif).
 * ============================================================================
 */

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, loginWithGoogle } = useAdminAuthStore();
  const [tab, setTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  // Verrouillage systématique du défilement d'arrière-plan quand la modale est active
  useBodyScrollLock(isAuthModalOpen);

  // Formulaire de connexion
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Intégration du composant Google Identity Services officiel
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const renderGoogleBtn = () => {
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
        (window as any).google.accounts.id.initialize({
          client_id: clientId,
          callback: async (res: any) => {
            if (res.credential) {
              setIsLoading(true);
              setErrorMessage(null);
              try {
                await loginWithGoogle(res.credential);
              } catch (err: any) {
                setErrorMessage(err.message || 'Échec de la validation du compte Google Staff.');
              } finally {
                setIsLoading(false);
              }
            }
          }
        });

        const target = document.getElementById('google-auth-btn-slot');
        if (target) {
          target.innerHTML = '';
          (window as any).google.accounts.id.renderButton(target, {
            type: 'standard',
            theme: 'filled_black',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: 380
          });
        }
      }
    };

    renderGoogleBtn();
    const timer = setTimeout(renderGoogleBtn, 400);
    return () => clearTimeout(timer);
  }, [isAuthModalOpen]);

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
      setErrorMessage(err.message || 'Échec de l’inscription staff. Veuillez vérifier vos informations.');
    } finally {
      setIsLoading(false);
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
        padding: '20px',
        overflowY: 'auto'
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

          {/* Séparateur et Connexion Google */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0 14px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>OU</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />
          </div>

          <div
            id="google-auth-btn-slot"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              minHeight: '44px'
            }}
          />
        </div>
      </div>
    </div>
  );
};
