import { ApiProperty } from '@nestjs/swagger';

export class MovieTrailerDto {
  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=tFMo3UJ4B4g',
  })
  url: string;
}
