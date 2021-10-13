import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { TrailerModule } from './trailer/trailer.module';

@Module({
  imports: [TmdbModule, TrailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
