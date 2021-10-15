import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ViaplayService } from './viaplay.service';

@Module({
  imports: [HttpModule.register({})],
  providers: [ViaplayService],
  exports: [ViaplayService],
})
export class ViaplayModule {}
