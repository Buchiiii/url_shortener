import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';
import { LinksService } from './modules/links/links.service';

@Controller()
export class AppController {
  constructor(private readonly linksService: LinksService) { }

  @Get('/:shortCode')
  public async redirect(@Param('shortCode') shortCode: string, @Res() res: Response): Promise<void> {
    const link = await this.linksService.getLinkByShortCode(shortCode);
    if (!link) {
      throw new Error('Link not found');
    }
    res.redirect(link.long_url);
  }
}
