'use client';

import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';

interface HeroSectionProps {
  onWatchNow?: () => void;
}

export default function HeroSection({ onWatchNow }: HeroSectionProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gdc-dark">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gdc-red/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gdc-red/10 rounded-full blur-3xl animate-pulse animation-delay-500" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gdc-red animate-pulse-glow">
            <span className="text-white font-bold text-4xl md:text-5xl">G</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-white">gamer</span>
          <span className="text-gdc-red">didik</span>
          <span className="text-white"> channel</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-gdc-gray-light mb-4 font-medium"
        >
          {siteConfig.tagline}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base sm:text-lg text-gdc-gray mb-8 max-w-2xl mx-auto"
        >
          30 episodes of educational esports content featuring Bob & Izz
        </motion.p>

        {/* Season Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
            Season 1 • 30 Episodes
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onWatchNow}
            className="btn-primary flex items-center gap-2 text-lg"
          >
            <Play size={20} fill="white" />
            Watch Now
          </button>
          <Link href="/episodes" className="btn-secondary text-lg">
            Browse Episodes
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gdc-gray hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gdc-dark to-transparent" />
    </section>
  );
}
