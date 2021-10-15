import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TrailerService } from './trailer.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MovieTrailerDto } from './dto/movie-trailer.dto';
import { NotFoundDto } from './dto/not-found.dto';
import { UrlPipe } from '../pipe/url.pipe';
@ApiTags('trailer')
@Controller()
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

  @Get('/api/v1/trailer/')
  @ApiOkResponse({ type: MovieTrailerDto })
  @ApiNotFoundResponse({ type: NotFoundDto })
  @ApiQuery({
    name: 'url',
    example: 'https://content.viaplay.se/pc-se/film/arrival-2016',
  })
  @UseInterceptors(CacheInterceptor)
  async findOne(@Query('url', new UrlPipe()) url: string) {
    return this.trailerService.findOne(url);
  }
}
