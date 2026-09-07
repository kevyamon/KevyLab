import React, { useState } from 'react';
import { Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { apiClient } from '../../../api/client';

/**
 * ============================================================================
 * KEVYLAB — COMPOSANT D'HÉBERGEMENT MÉDIA CLOUDINARY (ProjectImageUploader)
 * ============================================================================
 * Gère la sélection d'image locale, l'aperçu instantané et le téléversement
 * optimisé vers le stockage Cloudinary via l'API KevyLab (/api/v1/upload/image).
 * ============================================================================
 */

export interface ProjectImageUploaderProps {
  imageUrl: string;
  onImageUploaded: (url: string) => void;
  onImageRemoved: () => void;
  folder?: 'projects' | 'laureates' | 'events';
}

export const ProjectImageUploader: React.FC<ProjectImageUploaderProps> = ({
  imageUrl,
  onImageUploaded,
  onImageRemoved,
  folder = 'projects'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du type de fichier
    if (!file.type.startsWith('image/')) {
      setUploadError('Veuillez sélectionner un fichier image valide (PNG, JPG, WebP).');
      return;
    }

    // Validation de la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Le fichier est trop volumineux (10 Mo maximum).');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await apiClient.post<{ url: string }>('/upload/image', {
          image: base64Data,
          folder
        });
        onImageUploaded(res.url);
      } catch (err: any) {
        setUploadError(err.message || 'Échec du téléversement vers Cloudinary.');
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      setUploadError('Erreur de lecture du fichier local.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
        Visuel officiel & Bannière (Hébergement Cloudinary)
      </label>

      {imageUrl ? (
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            border: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-bg-elevated)',
            maxHeight: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={imageUrl}
            alt="Aperçu visuel"
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              display: 'flex',
              gap: '6px'
            }}
          >
            <button
              type="button"
              onClick={onImageRemoved}
              style={{
                backgroundColor: 'var(--color-bg-overlay)',
                color: 'var(--color-status-rejected)',
                border: '1px solid var(--color-status-rejected)',
                borderRadius: 'var(--radius-full)',
                padding: '6px',
                cursor: 'pointer'
              }}
              title="Supprimer l’image"
            >
              <X size={14} />
            </button>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              backgroundColor: 'var(--color-bg-overlay)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-status-accepted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Check size={12} />
            <span>Synchronisé Cloudinary</span>
          </div>
        </div>
      ) : (
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            border: '2px dashed var(--color-border-medium)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-bg-elevated)',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.2s',
            textAlign: 'center'
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            style={{ display: 'none' }}
          />
          {isUploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Loader2 size={24} color="var(--color-accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                Compression et envoi Cloudinary en cours...
              </span>
            </div>
          ) : (
            <>
              <Upload size={24} color="var(--color-accent-primary)" style={{ marginBottom: '8px' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Sélectionner une photo depuis vos fichiers
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                PNG, JPG, WebP jusqu'à 10 Mo • Format paysage recommandé
              </span>
            </>
          )}
        </label>
      )}

      {uploadError && (
        <span style={{ fontSize: '12px', color: 'var(--color-status-rejected)', marginTop: '4px' }}>
          {uploadError}
        </span>
      )}
    </div>
  );
};
