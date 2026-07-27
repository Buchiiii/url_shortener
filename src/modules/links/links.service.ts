import { Injectable } from '@nestjs/common';
import { HashGeneratorProvider } from './providers/hash-generator.provider';
import { CreateLinkDto } from './dtos/create_link.dto';
import { LinkDocument } from './entities/link.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LinksService {
    constructor(private hashService: HashGeneratorProvider, @InjectModel('Link') private linkModel: Model<LinkDocument>) { }

    public createLink(data: CreateLinkDto): Promise<LinkDocument> {

        const shortCode = this.hashService.generateHash(data.link);
        
        return this.linkModel.create({
            long_url: data.link,
            short_code: shortCode,
            expirationTime: data.expireTime
        });
    }
}
