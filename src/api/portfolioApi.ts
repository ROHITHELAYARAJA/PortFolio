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
  title: 'Software Developer · AI & Digital Systems',
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
      name: 'GitHub',
      url: 'https://github.com/ROHITHELAYARAJA',
      icon: 'github',
      color: '#181717',
      darkColor: '#EAEAEA'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/Shinchan_2007',
      icon: 'leetcode',
      color: '#FFA116',
      darkColor: '#FFA116'
    },
    {
      name: 'Rohith Digital X',
      url: 'https://rohith-digital-x-xi.vercel.app',
      icon: 'globe',
      color: '#0070F3',
      darkColor: '#0070F3'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rohith-elayaraja/',
      icon: 'linkedin',
      color: '#0A66C2',
      darkColor: '#0A66C2'
    },
    {
      name: 'Email',
      url: 'mailto:e.rohit3130@gmail.com',
      icon: 'mail',
      color: '#EA4335',
      darkColor: '#EA4335'
    },
    {
      name: 'Phone',
      url: 'tel:+919655483130',
      icon: 'phone',
      color: '#10B981',
      darkColor: '#10B981'
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
  apiSource: 'Portfolio Verified Engine API',
  syncedAt: new Date().toISOString()
};

export async function fetchHeroProfileFromApi(): Promise<HeroProfileApiResponse> {
  let profileData: HeroProfileApiResponse = { ...FALLBACK_PROFILE_DATA };

  try {
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
