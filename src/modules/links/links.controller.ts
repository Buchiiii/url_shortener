import { Body, Controller, Post } from '@nestjs/common';
import { CreateLinkDto } from './dtos/create_link.dto';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
    constructor(private linkService: LinksService) { }


    @Post()
    async createLink(@Body() createLinkDto: CreateLinkDto) {
        return await this.linkService.createLink(createLinkDto);
    }
}
