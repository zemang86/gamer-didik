import { episodes } from './episodes';
import { getBaseViews } from '@/lib/utils';

// Types
export interface DailyStats {
  date: string;
  views: number;
  uniqueViewers: number;
  watchTimeMinutes: number;
}

export interface EpisodeAnalytics {
  episodeId: number;
  episodeNumber: number;
  title: string;
  titleBM: string;
  thumbnailUrl: string;
  views: number;
  watchTimeMinutes: number;
  avgWatchPercent: number;
  shares: number;
}

export interface TrafficSource {
  source: string;
  icon: string;
  visitors: number;
  percentage: number;
  color: string;
}

export interface StateViewers {
  state: string;
  stateCode: string;
  viewers: number;
  percentage: number;
}

// Seeded random for consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Generate daily stats for December 2025
export function generateDailyStats(): DailyStats[] {
  const stats: DailyStats[] = [];

  for (let day = 1; day <= 31; day++) {
    const date = `2025-12-${day.toString().padStart(2, '0')}`;
    const dayOfWeek = new Date(date).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Base views with weekend boost
    let baseViews = 800 + seededRandom(day * 17) * 600;
    if (isWeekend) baseViews *= 1.4;

    // Gradual increase trend
    baseViews += day * 15;

    // Christmas spike
    if (day === 25) baseViews *= 1.8;
    if (day === 24 || day === 26) baseViews *= 1.3;

    // New Year's Eve buildup
    if (day >= 28) baseViews *= 1.2;

    const views = Math.floor(baseViews);
    const uniqueViewers = Math.floor(views * (0.7 + seededRandom(day * 23) * 0.15));
    const watchTimeMinutes = Math.floor(views * (2.5 + seededRandom(day * 31) * 1.5));

    stats.push({
      date,
      views,
      uniqueViewers,
      watchTimeMinutes,
    });
  }

  return stats;
}

// Generate episode analytics
export function generateEpisodeAnalytics(): EpisodeAnalytics[] {
  return episodes
    .filter(ep => !ep.comingSoon)
    .map(ep => {
      const baseViews = getBaseViews(ep.id);
      const seed = ep.id * 1337;

      // Earlier episodes have more views (had more time)
      const viewMultiplier = 1 + (20 - ep.episodeNumber) * 0.05;
      const views = Math.floor(baseViews * viewMultiplier);

      const avgWatchPercent = Math.floor(65 + seededRandom(seed) * 30); // 65-95%
      const watchTimeMinutes = Math.floor(views * (ep.duration / 60) * (avgWatchPercent / 100));
      const shares = Math.floor(views * (0.02 + seededRandom(seed + 2) * 0.03)); // 2-5% share rate

      return {
        episodeId: ep.id,
        episodeNumber: ep.episodeNumber,
        title: ep.title,
        titleBM: ep.titleBM,
        thumbnailUrl: ep.thumbnailUrl,
        views,
        watchTimeMinutes,
        avgWatchPercent,
        shares,
      };
    })
    .sort((a, b) => b.views - a.views); // Sort by views descending
}

// Malaysia states with weighted distribution
export function generateStateDistribution(): StateViewers[] {
  const stateWeights: { state: string; stateCode: string; weight: number }[] = [
    { state: 'Selangor', stateCode: 'SGR', weight: 25 },
    { state: 'Johor', stateCode: 'JHR', weight: 15 },
    { state: 'Sabah', stateCode: 'SBH', weight: 10 },
    { state: 'Sarawak', stateCode: 'SWK', weight: 10 },
    { state: 'Perak', stateCode: 'PRK', weight: 8 },
    { state: 'Pulau Pinang', stateCode: 'PNG', weight: 8 },
    { state: 'Kedah', stateCode: 'KDH', weight: 6 },
    { state: 'Kelantan', stateCode: 'KTN', weight: 5 },
    { state: 'Pahang', stateCode: 'PHG', weight: 4 },
    { state: 'Terengganu', stateCode: 'TRG', weight: 3 },
    { state: 'Negeri Sembilan', stateCode: 'NSN', weight: 2 },
    { state: 'Melaka', stateCode: 'MLK', weight: 2 },
    { state: 'Perlis', stateCode: 'PLS', weight: 1 },
    { state: 'WP Kuala Lumpur', stateCode: 'KUL', weight: 1 },
  ];

  const totalViews = generateDailyStats().reduce((sum, d) => sum + d.views, 0);

  return stateWeights.map((s, i) => {
    const variation = 1 + (seededRandom(i * 777) - 0.5) * 0.2; // ±10% variation
    const adjustedWeight = s.weight * variation;
    const viewers = Math.floor(totalViews * (adjustedWeight / 100));

    return {
      state: s.state,
      stateCode: s.stateCode,
      viewers,
      percentage: adjustedWeight,
    };
  }).sort((a, b) => b.viewers - a.viewers);
}

// Aggregate stats
export function getOverviewStats() {
  const dailyStats = generateDailyStats();
  const episodeStats = generateEpisodeAnalytics();

  const totalViews = dailyStats.reduce((sum, d) => sum + d.views, 0);
  const totalWatchTime = dailyStats.reduce((sum, d) => sum + d.watchTimeMinutes, 0);
  const totalShares = episodeStats.reduce((sum, e) => sum + e.shares, 0);
  const avgViewsPerEpisode = Math.floor(totalViews / episodeStats.length);
  const avgWatchPercent = Math.floor(
    episodeStats.reduce((sum, e) => sum + e.avgWatchPercent, 0) / episodeStats.length
  );

  return {
    totalViews,
    totalWatchTime,
    totalShares,
    avgViewsPerEpisode,
    avgWatchPercent,
    totalEpisodes: episodeStats.length,
  };
}

// Generate traffic sources
export function generateTrafficSources(): TrafficSource[] {
  const totalViews = generateDailyStats().reduce((sum, d) => sum + d.views, 0);

  const sources = [
    { source: 'WhatsApp', icon: 'whatsapp', weight: 32, color: '#25D366' },
    { source: 'Facebook', icon: 'facebook', weight: 18, color: '#1877F2' },
    { source: 'Twitter / X', icon: 'twitter', weight: 14, color: '#000000' },
    { source: 'Discord', icon: 'discord', weight: 12, color: '#5865F2' },
    { source: 'Reddit', icon: 'reddit', weight: 8, color: '#FF4500' },
    { source: 'LinkedIn', icon: 'linkedin', weight: 6, color: '#0A66C2' },
    { source: 'GitHub', icon: 'github', weight: 4, color: '#6e5494' },
    { source: 'Medium', icon: 'medium', weight: 3, color: '#00ab6c' },
    { source: 'Direct', icon: 'direct', weight: 3, color: '#8B8B8B' },
  ];

  return sources.map((s, i) => {
    const variation = 1 + (seededRandom(i * 555) - 0.5) * 0.3;
    const adjustedWeight = s.weight * variation;
    const visitors = Math.floor(totalViews * (adjustedWeight / 100));

    return {
      source: s.source,
      icon: s.icon,
      visitors,
      percentage: adjustedWeight,
      color: s.color,
    };
  }).sort((a, b) => b.visitors - a.visitors);
}

// Format helpers
export function formatWatchTime(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toLocaleString()}h ${mins}m`;
  }
  return `${minutes}m`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
