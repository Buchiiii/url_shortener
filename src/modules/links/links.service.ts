import { Injectable } from '@nestjs/common';
import { HashGeneratorProvider } from './providers/hash-generator.provider';
import { CreateLinkDto } from './dtos/create_link.dto';
import { Link, LinkDocument } from './entities/link.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { encodeBase62 } from '../../utils/encoder';
import { Counter, CounterDocument } from './entities/counter.entity';
import { CachingService } from 'src/core/caching/caching.service';

@Injectable()
export class LinksService {
    constructor(private hashService: HashGeneratorProvider, private cachingService: CachingService,
        @InjectModel(Link.name) private linkRepo: Model<LinkDocument>,
        @InjectModel(Counter.name) private counterRepo: Model<CounterDocument>
    ) { }

    private async getNextid(): Promise<number> {

        await this.counterRepo.findByIdAndUpdate('link_id', { $setOnInsert: { _seq: 1000000 } },
            { new: true, upsert: true })



        const counter = await this.counterRepo.findByIdAndUpdate('link_id',
            { $inc: { _seq: 1 } }, { new: true, upsert: true });
        return counter._seq;
    }

    public async createLink(data: CreateLinkDto): Promise<LinkDocument> {
        console.log("ID")

        if (data.alias) {
            const existingRecord = await this.linkRepo.findOne({ short_code: data.alias });
            if (existingRecord) {
                throw new Error("Alias already exists");
            }

            return this.linkRepo.create({
                long_url: data.link,
                short_code: data.alias,
                expirationTime: data.expireTime
            });


        }


        const record = await this.linkRepo.create({
            id: await this.getNextid(),
            long_url: data.link,
            expirationTime: data.expireTime
        })

        record.short_code = encodeBase62(record.id);
        record.save();

        return record;

    }


    public async getLinkByShortCode(shortCode: string): Promise<LinkDocument | null> {

        const cachedLink = await this.cachingService.getFromCache<LinkDocument>(shortCode);
        console.log("Cached Link:", cachedLink);

        if (cachedLink) {
            console.log("Cache hit for shortCode:", shortCode);
            return cachedLink;
        }

        console.log("Cache Miss for shortCode:", shortCode);

        const link = await this.linkRepo.findOne({ short_code: shortCode });

        if (link) {
            console.log("Setting cache for shortCode:", shortCode);
            await this.cachingService.setToCache('buchi', 'buchi');
            // await this.cachingService.testCache();
            try {
                const res = await this.cachingService.setToCache(shortCode, link.toObject());
                console.error("Cache set result:", res);

            } catch (error) {
                console.log("Error setting cache:", error);
            }
        }
        return link;
    }
}
