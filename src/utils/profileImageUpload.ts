
import { supabase } from "@/integrations/supabase/client";

export const uploadProfileImage = async (
  file: File,
  type: 'avatar' | 'banner'
): Promise<string> => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    throw new Error("No authenticated user found");
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${session.session.user.id}/${type}_${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('profile_images')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('profile_images')
    .getPublicUrl(filePath);

  const updateData = type === 'avatar'
    ? { avatar_url: publicUrl }
    : { banner_image: publicUrl };

  const { error: updateError } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', session.session.user.id);

  if (updateError) {
    throw updateError;
  }

  return publicUrl;
};
