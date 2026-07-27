import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { HashGeneratorProvider } from './providers/hash-generator.provider';
import { LinkSchema } from './entities/link.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }])],
  providers: [LinksService, HashGeneratorProvider],
  controllers: [LinksController]
})
export class LinksModule { }
