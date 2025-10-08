"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Camera, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface UserAvatarProps {
  userId: string | undefined;
  initialUrl: string | null | undefined;
  onUpload: (url: string) => void;
  size?: number;
}

export function UserAvatar({ userId, initialUrl, onUpload, size = 128 }: UserAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialUrl || null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialUrl) {
      setAvatarUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return;
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    if (!userId) {
        toast.error("Usuário não identificado. Não é possível fazer o upload.");
        return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    setIsUploading(true);

    // Show a preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Erro ao enviar a foto. Tente novamente.");
      console.error("Upload error:", uploadError);
      setAvatarUrl(initialUrl || null); // Revert preview on error
      setIsUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlData.publicUrl) {
        onUpload(urlData.publicUrl);
        toast.success("Foto de perfil atualizada!");
    } else {
        toast.error("Não foi possível obter a URL da imagem.");
        setAvatarUrl(initialUrl || null); // Revert preview
    }

    setIsUploading(false);
  };

  const iconSize = size / 2.6;

  return (
    <div className="relative inline-block">
      <label htmlFor="avatar-upload" className="cursor-pointer group">
        <Avatar style={{ width: `${size}px`, height: `${size}px` }} className="border-4 border-gray-700 transition-all group-hover:border-blue-500">
          <AvatarImage src={avatarUrl || ""} alt="User avatar" />
          <AvatarFallback className="bg-gray-800">
            {isUploading ? (
              <Loader2 style={{ width: `${iconSize}px`, height: `${iconSize}px` }} className="animate-spin text-gray-500" />
            ) : (
              <User style={{ width: `${iconSize}px`, height: `${iconSize}px` }} className="text-gray-500" />
            )}
          </AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 transition-transform group-hover:scale-110">
          <Camera size={20} className="text-white" />
        </div>
      </label>
      <Input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
}