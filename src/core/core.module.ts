import { Module } from '@nestjs/common';
import { CachingModule } from './caching/caching.module';



@Module({
    imports: [CachingModule],
    controllers: [],
    providers: [],
})
export class CoreModule { }