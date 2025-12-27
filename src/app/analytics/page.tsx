'use client';

import { motion } from 'framer-motion';
import { Eye, Clock, Share2, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/analytics/StatsCard';
import ViewsChart from '@/components/analytics/ViewsChart';
import MalaysiaMap from '@/components/analytics/MalaysiaMap';
import EpisodeTable from '@/components/analytics/EpisodeTable';
import TrafficSources from '@/components/analytics/TrafficSources';
import {
  generateDailyStats,
  generateEpisodeAnalytics,
  generateStateDistribution,
  generateTrafficSources,
  getOverviewStats,
  formatWatchTime,
} from '@/data/analyticsData';

export default function AnalyticsPage() {
  const dailyStats = generateDailyStats();
  const episodeStats = generateEpisodeAnalytics();
  const stateDistribution = generateStateDistribution();
  const trafficSources = generateTrafficSources();
  const overview = getOverviewStats();

  return (
    <main className="min-h-screen bg-gdc-dark pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Analytics Dashboard
              </h1>
              <p className="text-gdc-gray-light mt-1">
                Season 1 Performance • December 2025
              </p>
            </div>
            <div className="px-4 py-2 bg-gdc-red/20 border border-gdc-red/30 rounded-lg">
              <p className="text-gdc-red text-sm font-medium">Live Data</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Views"
            value={overview.totalViews.toLocaleString()}
            icon={Eye}
            subtitle="All episodes combined"
            index={0}
          />
          <StatsCard
            title="Watch Time"
            value={formatWatchTime(overview.totalWatchTime)}
            icon={Clock}
            subtitle="Total minutes watched"
            index={1}
          />
          <StatsCard
            title="Total Shares"
            value={overview.totalShares.toLocaleString()}
            icon={Share2}
            subtitle="Across all platforms"
            index={2}
          />
          <StatsCard
            title="Avg. Completion"
            value={`${overview.avgWatchPercent}%`}
            icon={TrendingUp}
            subtitle="Average watch percentage"
            index={3}
          />
        </div>

        {/* Views Chart - Full Width */}
        <div className="mb-8">
          <ViewsChart data={dailyStats} />
        </div>

        {/* Map and Traffic Sources - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MalaysiaMap data={stateDistribution} />
          <TrafficSources data={trafficSources} />
        </div>

        {/* Episodes Table - Full Width */}
        <div className="mb-8">
          <EpisodeTable data={episodeStats} />
        </div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 p-6 glass rounded-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{overview.totalEpisodes}</p>
              <p className="text-gdc-gray text-sm">Episodes Released</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {Math.floor(overview.avgViewsPerEpisode / 1000 * 10) / 10}K
              </p>
              <p className="text-gdc-gray text-sm">Avg Views/Episode</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{overview.totalShares.toLocaleString()}</p>
              <p className="text-gdc-gray text-sm">Total Shares</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">14</p>
              <p className="text-gdc-gray text-sm">States Reached</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
