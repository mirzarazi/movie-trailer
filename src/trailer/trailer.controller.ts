import { Controller, Get, Param } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('trailer')
@Controller('trailer')
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

  @Get(':url')
  findOne(@Param('url') url: string) {
    return this.trailerService.findOne(url);
  }
}
