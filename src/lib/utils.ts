import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getYouTubeThumbnail(youtubeId: string, quality: 'default' | 'hq' | 'maxres' = 'hq'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    maxres: 'maxresdefault',
  };
  return `https://img.youtube.com/vi/${youtubeId}/${qualityMap[quality]}.jpg`;
}

// Generate consistent "fake" base views for each episode (1500-3500 range)
export function getBaseViews(episodeId: number): number {
  // Use episode ID as seed for consistent pseudo-random number
  const seed = episodeId * 9973 + 7919; // Prime numbers for better distribution
  const normalized = Math.abs(Math.sin(seed) * 10000) % 1;
  return Math.floor(1500 + normalized * 2000); // 1500-3500 range
}

// Get views from localStorage
export function getStoredViews(episodeId: number): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(`gdc-views-${episodeId}`);
  return stored ? parseInt(stored, 10) : 0;
}

// Increment views in localStorage
export function incrementViews(episodeId: number): number {
  if (typeof window === 'undefined') return 0;
  const current = getStoredViews(episodeId);
  const newCount = current + 1;
  localStorage.setItem(`gdc-views-${episodeId}`, newCount.toString());
  return newCount;
}

// Get total views (base + stored)
export function getTotalViews(episodeId: number): number {
  return getBaseViews(episodeId) + getStoredViews(episodeId);
}

// Format view count (e.g., 1.5K, 2.3K)
export function formatViews(views: number): string {
  if (views >= 1000) {
    return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return views.toString();
}
