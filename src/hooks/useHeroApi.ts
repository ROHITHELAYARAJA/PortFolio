import { useState, useEffect, useCallback } from 'react';
import { fetchHeroProfileFromApi, HeroProfileApiResponse, FALLBACK_PROFILE_DATA } from '../api/portfolioApi';

export function useHeroApi() {
  const [profile, setProfile] = useState<HeroProfileApiResponse>(FALLBACK_PROFILE_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchHeroProfileFromApi();
      setProfile(data);
      setIsLive(true);
      setError(null);
    } catch (err) {
      console.error('[useHeroApi] Error fetching source of truth API:', err);
      setError('Failed to reach API endpoint');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { profile, loading, isLive, error, refresh };
}
