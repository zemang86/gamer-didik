'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Youtube, Instagram, Play } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gdc-dark pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gdc-red mb-6">
            <span className="text-white font-bold text-4xl">G</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-white">gamer</span>
            <span className="text-gdc-red">didik</span>
            <span className="text-white"> channel</span>
          </h1>
          <p className="text-xl text-gdc-red font-medium mb-4">
            {siteConfig.tagline}
          </p>
          <p className="text-gdc-gray-light text-lg max-w-2xl mx-auto">
            {siteConfig.description}
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
          <div className="glass rounded-2xl p-6 md:p-8">
            <p className="text-gdc-gray-light leading-relaxed">
              Gamer Didik Channel is an educational esports content series designed to bridge the gap
              between gaming and education. Through engaging short-form videos, we aim to debunk myths
              about gaming, showcase the positive aspects of esports, and highlight the valuable skills
              that competitive gaming can develop - including discipline, teamwork, resilience, and
              critical thinking.
            </p>
          </div>
        </motion.section>

        {/* Characters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Meet the Characters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bob */}
            <div className="glass rounded-2xl p-6">
              <div className="w-24 h-24 rounded-full bg-gdc-red/20 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-gdc-red">B</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Bob</h3>
              <p className="text-gdc-red text-sm mb-4">The Veteran Gamer</p>
              <p className="text-gdc-gray text-sm leading-relaxed">
                An expressive, witty, slightly sarcastic &ldquo;abang gamer&rdquo; who represents the inside of esports:
                the passion, the grind, the late-night sessions, the emotional highs and lows. Bob knows
                the esports world inside out and loves sharing his gaming wisdom.
              </p>
            </div>

            {/* Izz */}
            <div className="glass rounded-2xl p-6">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-white">I</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Izz</h3>
              <p className="text-gdc-gray-light text-sm mb-4">The Newcomer</p>
              <p className="text-gdc-gray text-sm leading-relaxed">
                A quiet, curious first-time intern who represents the outside looking in: someone who
                doesn&apos;t fully understand esports but is curious, observant, and honest about how
                confusing it all looks at first. Izz asks the questions everyone is thinking.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Season Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Season 1</h2>
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-gdc-red rounded-full text-sm font-bold text-white">
                30 Episodes
              </span>
              <span className="text-gdc-gray">Educational Esports Content</span>
            </div>
            <p className="text-gdc-gray-light leading-relaxed mb-6">
              Season 1 covers the fundamentals of esports - from understanding what competitive gaming
              is all about, to developing the right mindset, building teamwork skills, and exploring
              career opportunities in the gaming industry.
            </p>
            <Link href="/episodes" className="btn-primary inline-flex items-center gap-2">
              <Play size={18} fill="white" />
              Start Watching
            </Link>
          </div>
        </motion.section>

        {/* Sponsors */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Supported By</h2>
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex flex-wrap gap-6 justify-center">
              {siteConfig.sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="px-6 py-3 bg-white/5 rounded-lg text-gdc-gray-light font-medium"
                >
                  {sponsor.name}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Social Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Follow Us</h2>
          <div className="flex justify-center gap-4">
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/10 hover:bg-gdc-red rounded-full text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/10 hover:bg-gdc-red rounded-full text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
