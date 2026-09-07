import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';

/**
 * ============================================================================
 * KEVYLAB — FORMULAIRE D'INSCRIPTION STAFF (AdminRegisterForm)
 * ============================================================================
 * Composant extrait pour garantir la modularisation et le strict respect
 * du plafond de 325 lignes.
 * ============================================================================
 */

export interface AdminRegisterFormProps {
  isLoading: boolean;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    adminPw: string;
  }) => Promise<void>;
  inputStyle: React.CSSProperties;
}

export const AdminRegisterForm: React.FC<AdminRegisterFormProps> = ({
  isLoading,
  onSubmit,
  inputStyle
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPw, setAdminPw] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, email, password, adminPw });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <input
          type="text"
          required
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          required
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={inputStyle}
        />
      </div>

      <input
        type="email"
        required
        placeholder="Courriel professionnel"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        required
        placeholder="Mot de passe robuste"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <div>
        <label
          style={{
            display: 'block',
            fontSize: '12px',
            color: 'var(--color-text-accent)',
            marginBottom: '4px',
            fontWeight: 600
          }}
        >
          Clé Secrète Render (ADMIN_PW) *
        </label>
        <input
          type="password"
          required
          placeholder="Clé secrète d’inscription administrative"
          value={adminPw}
          onChange={(e) => setAdminPw(e.target.value)}
          style={inputStyle}
        />
      </div>

      <Button variant="primary" size="lg" type="submit" isLoading={isLoading} style={{ marginTop: '6px' }}>
        <span>Créer mon compte staff</span>
      </Button>
    </form>
  );
};
