import Link from 'next/link';
import { Youtube, Instagram } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-gdc-dark-light border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gdc-red flex items-center justify-center font-bold text-white text-lg">
                G
              </div>
              <span className="font-bold text-xl">
                <span className="text-white">gamer</span>
                <span className="text-gdc-red">didik</span>
              </span>
            </Link>
            <p className="text-gdc-gray text-sm mb-4">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gdc-gray hover:text-gdc-red transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gdc-gray hover:text-gdc-red transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gdc-gray hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/episodes" className="text-gdc-gray hover:text-white transition-colors text-sm">
                  All Episodes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gdc-gray hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported By */}
          <div>
            <h3 className="font-semibold text-white mb-4">Supported By</h3>
            <div className="flex flex-wrap gap-4">
              {siteConfig.sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="text-gdc-gray text-sm"
                >
                  {sponsor.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gdc-gray text-sm">
            &copy; {new Date().getFullYear()} Gamer Didik Channel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
