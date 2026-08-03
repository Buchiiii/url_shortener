import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { HashGeneratorProvider } from './providers/hash-generator.provider';
import { Link, LinkSchema } from './entities/link.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Counter, CounterSchema } from './entities/counter.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema },
  { name: Counter.name, schema: CounterSchema }])],
  providers: [LinksService, HashGeneratorProvider],
  controllers: [LinksController]
})
export class LinksModule { }
