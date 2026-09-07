import React, { useState } from 'react';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { Button } from '../../../components/common/Button';
import { X, Lock, KeyRound, ShieldAlert } from 'lucide-react';

/**
 * ============================================================================
 * KEVYLAB — MODALE D'AUTHENTIFICATION FURTIVE ADMIN
 * ============================================================================
 * Accessible uniquement après l'appui long de 10 secondes sur ScrollToTop.
 * Permet la connexion ou l'inscription sécurisée par la clé secrète "ADMIN_PW".
 * ============================================================================
 */

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAdminAuthStore();
  const [tab, setTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  // Formulaire de connexion
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Formulaire d'inscription
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAdminPw, setRegAdminPw] = useState('');

  const [isLoading, setIsLoading] = useState(false);
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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await register({
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        password: regPassword,
        adminPw: regAdminPw
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Échec de l’enregistrement. Clé ADMIN_PW invalide.');
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
          <button
            onClick={() => { setTab('LOGIN'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: tab === 'LOGIN' ? 'var(--color-bg-elevated)' : 'transparent',
              color: tab === 'LOGIN' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              borderBottom: tab === 'LOGIN' ? '2px solid var(--color-accent-primary)' : 'none'
            }}
          >
            Connexion
          </button>
          <button
            onClick={() => { setTab('REGISTER'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: tab === 'REGISTER' ? 'var(--color-bg-elevated)' : 'transparent',
              color: tab === 'REGISTER' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              borderBottom: tab === 'REGISTER' ? '2px solid var(--color-accent-primary)' : 'none'
            }}
          >
            Inscription Staff
          </button>
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

              <Button variant="primary" size="lg" type="submit" isLoading={isLoading} style={{ marginTop: '8px' }}>
                <KeyRound size={16} />
                <span>Accéder au Dashboard</span>
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  required
                  placeholder="Prénom"
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  required
                  placeholder="Nom"
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <input
                type="email"
                required
                placeholder="Courriel professionnel"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                style={inputStyle}
              />

              <input
                type="password"
                required
                placeholder="Mot de passe robuste"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                style={inputStyle}
              />

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-accent)', marginBottom: '4px', fontWeight: 600 }}>
                  Clé Secrète Render (ADMIN_PW) *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Clé secrète d’inscription administrative"
                  value={regAdminPw}
                  onChange={(e) => setRegAdminPw(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <Button variant="primary" size="lg" type="submit" isLoading={isLoading} style={{ marginTop: '6px' }}>
                <span>Créer mon compte staff</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
