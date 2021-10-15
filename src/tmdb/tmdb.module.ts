import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TmdbService } from './tmdb.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule.register({}), ConfigModule],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
