'use client';

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DailyStats } from '@/data/analyticsData';

interface ViewsChartProps {
  data: DailyStats[];
}

export default function ViewsChart({ data }: ViewsChartProps) {
  // Format date for display
  const chartData = data.map(d => ({
    ...d,
    displayDate: new Date(d.date).getDate().toString(),
    fullDate: new Date(d.date).toLocaleDateString('ms-MY', {
      day: 'numeric',
      month: 'short',
    }),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Daily Views</h3>
          <p className="text-gdc-gray text-sm">December 2025</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gdc-red" />
            <span className="text-gdc-gray">Views</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E63946" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#E63946" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
            <XAxis
              dataKey="displayDate"
              stroke="#8B8B8B"
              tick={{ fill: '#8B8B8B', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#2A2A2A' }}
            />
            <YAxis
              stroke="#8B8B8B"
              tick={{ fill: '#8B8B8B', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              itemStyle={{ color: '#E63946' }}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate || ''}
              formatter={(value?: number) => [(value ?? 0).toLocaleString(), 'Views']}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#E63946"
              strokeWidth={2}
              fill="url(#viewsGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
