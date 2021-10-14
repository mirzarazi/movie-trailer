export enum VideoType {
  Trailer = 'Trailer',
}

export enum VideoSite {
  YouTube = 'YouTube',
}

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: VideoSite;
  size: number;
  type: VideoType;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface TmdbVideo {
  id: number;
  results: MovieVideo[];
}
