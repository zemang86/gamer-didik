export interface Episode {
  id: number;
  slug: string;
  title: string;
  titleBM: string;
  description: string;
  descriptionBM: string;
  youtubeId: string;
  thumbnailUrl: string;
  duration: number;
  season: number;
  episodeNumber: number;
  releaseDate: string;
  tags: string[];
  topic: string;
  featured?: boolean;
}

export interface Season {
  id: number;
  title: string;
  description: string;
  episodes: Episode[];
  totalEpisodes: number;
}
