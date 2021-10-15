import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { TmdbService } from '../tmdb/tmdb.service';
import { ViaplayService } from '../viaplay/viaplay.service';
@Injectable()
export class TrailerService {
  constructor(
    private viaPlayService: ViaplayService,
    private tmdbService: TmdbService,
  ) {}

  async findOne(url: string) {
    const response: any = await this.viaPlayService.movieInfo(url).catch(() => {
      throw new NotFoundException();
    });
    const imdbId: string = _.get(
      response,
      [
        '_embedded',
        'viaplay:blocks',
        '0',
        '_embedded',
        'viaplay:product',
        'content',
        'imdb',
        'id',
      ],
      null,
    );
    if (imdbId) return this.tmdbService.movieTrailer(imdbId);
    throw new NotFoundException();
  }
}
