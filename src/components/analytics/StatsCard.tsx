'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  index?: number;
}

export default function StatsCard({ title, value, icon: Icon, subtitle, index = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl p-6 relative overflow-hidden group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gdc-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon background */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gdc-red/10 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gdc-red/20 rounded-lg">
            <Icon className="w-6 h-6 text-gdc-red" />
          </div>
        </div>

        <h3 className="text-gdc-gray text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
        {subtitle && (
          <p className="text-gdc-gray-light text-xs mt-2">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
