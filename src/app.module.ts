import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { TrailerModule } from './trailer/trailer.module';
import { ViaplayModule } from './viaplay/viaplay.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService) => ({
        ttl: configService.get('options.cacheTTL'),
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
    TmdbModule,
    TrailerModule,
    ViaplayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
