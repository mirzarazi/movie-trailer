import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { MovieVideo, TmdbVideo, VideoSite, VideoType } from './tmdb.interface';
@Injectable()
export class TmdbService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.httpService.axiosRef.interceptors.request.use((config) => {
      config.baseURL = this.configService.get('tmdb.baseUrl');
      config.url = `${config.url}?api_key=${this.configService.get(
        'tmdb.apiKey',
      )}&language=en-US`;
      return config;
    });
    this.httpService.axiosRef.interceptors.response.use((response) => {
      return response.data;
    });
  }

  async movieTrailer(imdbId: string): Promise<{ url: string }> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`/3/movie/${imdbId}/videos`),
      );
      const videos: TmdbVideo = response as unknown as TmdbVideo;
      const movieVideo: MovieVideo = videos.results
        .filter(
          (video: MovieVideo) =>
            video.type == VideoType['Trailer'] &&
            video.site == VideoSite['YouTube'],
        )
        .sort(
          (video1: MovieVideo, video2: MovieVideo) =>
            new Date(video1.published_at).getTime() -
            new Date(video2.published_at).getTime(),
        )[0];
      if (movieVideo) {
        return {
          url: `https://www.youtube.com/watch?v=${movieVideo.key}`,
        };
      }
    } catch (e) {}

    throw new NotFoundException();
  }
}
