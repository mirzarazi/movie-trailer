import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { ViaplayService } from 'src/viaplay/viaplay.service';
@Injectable()
export class TrailerService {
  constructor(
    private viaPlayService: ViaplayService,
    private tmdbService: TmdbService,
  ) {}

  async findOne(url: string) {
    const response: any = await this.viaPlayService.movieInfo(url);
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
    return this.tmdbService.movieTrailer(imdbId);
  }
}
