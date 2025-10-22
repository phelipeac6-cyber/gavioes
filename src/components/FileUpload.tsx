import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  bucket: string;
  userId: string;
  onUploadComplete?: (url: string) => void;
  accept?: string;
  maxSize?: number; // em bytes
  className?: string;
}

export const FileUpload = ({ 
  bucket, 
  userId, 
  onUploadComplete, 
  accept = "*/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className = ""
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamanho
    if (file.size > maxSize) {
      showError(`Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`);
      return;
    }

    // Validar tipo se for imagem
    if (accept.includes('image') && !file.type.startsWith('image/')) {
      showError('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${new Date().getTime()}.${fileExt}`;

      // Fazer upload
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      setProgress(100);
      showSuccess('Arquivo enviado com sucesso!');
      onUploadComplete?.(publicUrl);

      // Criar preview se for imagem
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

    } catch (error: any) {
      showError(`Erro ao enviar arquivo: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUploadComplete?.('');
  };

  const getFileIcon = () => {
    if (accept.includes('image')) {
      return <ImageIcon className="w-8 h-8 text-gray-400" />;
    }
    return <FileText className="w-8 h-8 text-gray-400" />;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {preview ? (
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <>
                {getFileIcon()}
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Clique para enviar</span> ou arraste o arquivo
                </p>
                <p className="text-xs text-gray-500">
                  {accept.includes('image') ? 'PNG, JPG, GIF' : 'Todos os arquivos'} até {maxSize / 1024 / 1024}MB
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept={accept}
            disabled={uploading}
          />
        </label>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Enviando...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}
    </div>
  );
};