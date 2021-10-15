import { Module } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { TrailerController } from './trailer.controller';
import { ViaplayModule } from '../viaplay/viaplay.module';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [ViaplayModule, TmdbModule],
  controllers: [TrailerController],
  providers: [TrailerService],
})
export class TrailerModule {}
