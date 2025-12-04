'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import YouTube from 'react-youtube';
import { Episode } from '@/types/episode';
import { formatDuration } from '@/lib/utils';

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
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

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
