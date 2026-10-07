export interface SocialApiItem {
  name: string;
  url: string;
  icon: string;
  color: string;
  darkColor?: string;
}

export interface HeroProfileApiResponse {
  name: string;
  title: string;
  subtitle: string;
  avatarUrl: string;
  heroVideoUrl: string;
  heroBannerPoster?: string;
  bioIntro: string;
  bioBullets: string[];
  currentlyBuilding: {
    name: string;
    url: string;
    description?: string;
  };
  socials: SocialApiItem[];
  layout: {
    defaultWindowSize: number;
    fitMode: string;
    maxWidthPercent: number;
    videoAspect: string;
  };
  verifiedMilestones: string[];
  apiSource: string;
  syncedAt: string;
  githubStats?: {
    publicRepos: number;
    followers: number;
    bio?: string;
  };
}

export const FALLBACK_PROFILE_DATA: HeroProfileApiResponse = {
  name: 'Rohith E',
  title: 'Engineer | AI | Freelancer',
  subtitle: 'Software Developer / AI & ML Engineer',
  avatarUrl: '/assets/profile.png',
  heroVideoUrl: '/assets/hero-loop.mp4',
  heroBannerPoster: '/assets/profile.png',
  bioIntro: 'Software Developer. I love building, breaking, and shipping things.',
  bioBullets: [
    'AI, open source, and developer tools excite me.',
    'I believe actions speak louder than words, so I put my code where my mouth is.',
    'Currently building Virtual Labs & Blast AI'
  ],
  currentlyBuilding: {
    name: 'Virtual Labs & Blast AI',
    url: 'https://github.com/ROHITHELAYARAJA/Virtual-Labs',
    description: 'Multi-tenant cloud engineering simulation platform'
  },
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rohith-elayaraja/',
      icon: 'linkedin',
      color: '#0A66C2',
      darkColor: '#0A66C2'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ROHITHELAYARAJA',
      icon: 'github',
      color: '#181717',
      darkColor: '#EAEAEA'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/ROHITHELAYARAJA/',
      icon: 'leetcode',
      color: '#FFA116',
      darkColor: '#FFA116'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/',
      icon: 'instagram',
      color: '#E4405F',
      darkColor: '#E4405F'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/',
      icon: 'youtube',
      color: '#FF0000',
      darkColor: '#FF0000'
    },
    {
      name: 'X',
      url: 'https://x.com/',
      icon: 'x',
      color: '#000000',
      darkColor: '#EAEAEA'
    }
  ],
  layout: {
    defaultWindowSize: 100,
    fitMode: 'fluid-fit-all',
    maxWidthPercent: 100,
    videoAspect: '1047/278'
  },
  verifiedMilestones: [
    'Merged PR #70 on abacusai/abacusai-bot upstream',
    '12 Core Engineering Laboratories deployed in Virtual Labs',
    'Blast AI Study Platform AWS Bedrock integration'
  ],
  apiSource: 'Portfolio Verified Engine API (Source of Truth)',
  syncedAt: new Date().toISOString()
};

/**
 * Fetch portfolio data from internal API endpoint and GitHub API.
 * The API result is treated as the authoritative source of truth.
 */
export async function fetchHeroProfileFromApi(): Promise<HeroProfileApiResponse> {
  let profileData: HeroProfileApiResponse = { ...FALLBACK_PROFILE_DATA };

  try {
    // 1. Fetch internal API endpoint
    const res = await fetch('/api/profile.json', {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (res.ok) {
      const data = await res.json();
      profileData = { ...profileData, ...data, apiSource: 'Live Local / Server API' };
    }
  } catch (err) {
    console.warn('[API Client] Local API endpoint unreachable, falling back to cached baseline:', err);
  }

  // 2. Fetch live GitHub metadata to enrich the profile as source of truth
  try {
    const ghRes = await fetch('https://api.github.com/users/ROHITHELAYARAJA', {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (ghRes.ok) {
      const ghData = await ghRes.json();
      profileData.githubStats = {
        publicRepos: ghData.public_repos || 25,
        followers: ghData.followers || 10,
        bio: ghData.bio || undefined
      };
      profileData.apiSource = 'Live API Synchronized (GitHub + Local API)';
      profileData.syncedAt = new Date().toISOString();
    }
  } catch (err) {
    console.warn('[API Client] Live GitHub API call skipped or rate-limited:', err);
  }

  return profileData;
}
