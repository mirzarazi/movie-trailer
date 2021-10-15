import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UrlPipe implements PipeTransform {
  transform(url: string) {
    const expression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (url.match(regex)) return url;
    throw new BadRequestException(null, 'URL is not valid');
  }
}
