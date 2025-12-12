'use client';

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Clock, Share2, Link2, Check } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import YouTube from 'react-youtube';
import { Episode } from '@/types/episode';
import { formatDuration } from '@/lib/utils';
import { siteConfig } from '@/data/siteConfig';

interface VideoModalProps {
  episode: Episode | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function VideoModal({
  episode,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: VideoModalProps) {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious) onPrevious?.();
      if (e.key === 'ArrowRight' && hasNext) onNext?.();
    },
    [onClose, onPrevious, onNext, hasPrevious, hasNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      // Reset states when modal closes
      setShowShareMenu(false);
      setCopied(false);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowShareMenu(false);
    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showShareMenu]);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/episodes?ep=${episode?.slug}`;
    }
    return `${siteConfig.url}/episodes?ep=${episode?.slug}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${episode?.titleBM} - Gamer Didik Channel`,
      text: episode?.descriptionBM,
      url: getShareUrl(),
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const shareToWhatsApp = () => {
    const text = `Tonton ${episode?.titleBM} di Gamer Didik Channel! 🎮\n\n${getShareUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = `Tonton ${episode?.titleBM} di @GamerDidik! 🎮`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getShareUrl())}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`, '_blank');
  };

  if (!episode) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed inset-4 md:inset-8 lg:inset-12 z-50 flex flex-col"
              >
                {/* Close Button */}
                <Dialog.Close asChild>
                  <button
                    className="absolute top-0 right-0 z-10 p-3 text-white hover:text-gdc-red transition-colors"
                    aria-label="Close"
                  >
                    <X size={28} />
                  </button>
                </Dialog.Close>

                {/* Video Container */}
                <div className="relative flex-1 bg-black rounded-t-xl overflow-hidden">
                  <YouTube
                    videoId={episode.youtubeId}
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                      },
                    }}
                    className="absolute inset-0 w-full h-full"
                    iframeClassName="w-full h-full"
                  />

                  {/* Navigation Arrows */}
                  {hasPrevious && (
                    <button
                      onClick={onPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-gdc-red rounded-full text-white transition-colors"
                      aria-label="Previous episode"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}
                  {hasNext && (
                    <button
                      onClick={onNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-gdc-red rounded-full text-white transition-colors"
                      aria-label="Next episode"
                    >
                      <ChevronRight size={24} />
                    </button>
                  )}
                </div>

                {/* Episode Info */}
                <div className="bg-gdc-dark-lighter rounded-b-xl p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-gdc-red rounded text-xs font-bold text-white">
                          EP {episode.episodeNumber}
                        </span>
                        <span className="text-gdc-gray text-sm flex items-center gap-1">
                          <Clock size={14} />
                          {formatDuration(episode.duration)}
                        </span>
                      </div>
                      <Dialog.Title className="text-xl md:text-2xl font-bold text-white mb-2">
                        {episode.titleBM}
                      </Dialog.Title>
                      <Dialog.Description className="text-gdc-gray-light text-sm md:text-base">
                        {episode.descriptionBM}
                      </Dialog.Description>
                    </div>

                    {/* Share Button */}
                    <div className="relative">
                      <button
                        onClick={handleShare}
                        className="p-3 bg-white/10 hover:bg-gdc-red rounded-full text-white transition-colors"
                        aria-label="Share episode"
                      >
                        <Share2 size={20} />
                      </button>

                      {/* Share Menu Dropdown */}
                      <AnimatePresence>
                        {showShareMenu && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-gdc-dark-lighter border border-white/10 rounded-lg shadow-xl overflow-hidden z-20"
                          >
                            <button
                              onClick={() => { shareToWhatsApp(); setShowShareMenu(false); }}
                              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                            >
                              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              WhatsApp
                            </button>
                            <button
                              onClick={() => { shareToTwitter(); setShowShareMenu(false); }}
                              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                              </svg>
                              Twitter / X
                            </button>
                            <button
                              onClick={() => { shareToFacebook(); setShowShareMenu(false); }}
                              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                            >
                              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                              Facebook
                            </button>
                            <button
                              onClick={() => { handleCopyLink(); setShowShareMenu(false); }}
                              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-t border-white/10"
                            >
                              {copied ? <Check size={20} className="text-green-500" /> : <Link2 size={20} />}
                              {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Episode Navigation */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <button
                      onClick={onPrevious}
                      disabled={!hasPrevious}
                      className="flex items-center gap-2 text-sm text-gdc-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                      Previous Episode
                    </button>
                    <button
                      onClick={onNext}
                      disabled={!hasNext}
                      className="flex items-center gap-2 text-sm text-gdc-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Episode
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
