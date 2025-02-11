import { useState } from 'react';
import supabase from '@/utils/supabase';
import { toast } from 'react-toastify';

export default function useUpdateSettings() {
  const [isLoading, setIsLoading] = useState(false);

  async function updateSettings(breakRatio: number) {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('settings')
      .update({ break_ratio: breakRatio })
      .eq('user_id', user?.id);

    if (error) {
      toast(error.message);
    } else {
      toast('Settings updated successfully!');
    }
    setIsLoading(false);

    return { data, error };
  }

  return {
    isLoading,
    updateSettings,
  };
}
