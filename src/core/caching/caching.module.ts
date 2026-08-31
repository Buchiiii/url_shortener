import { Global, Inject, Module, OnModuleInit } from "@nestjs/common";
import { CACHE_MANAGER, CacheModule } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { createKeyv, Keyv } from "@keyv/redis";
import { CachingService } from "./caching.service";
import type { Cache } from "cache-manager";



@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: async (configService: ConfigService) => {


                return {
                    ttl: configService.get<number>('cache_ttl'),
                    stores: [createKeyv(configService.get<string>('cache_url'), { namespace: 'app' })],
                }


            },
            inject: [ConfigService],
        })
    ],
    controllers: [],
    providers: [CachingService],
    exports: [CachingService],
})
export class CachingModule implements OnModuleInit {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    onModuleInit() {
        // Access the Keyv adapter instance safely
        const anyManager = this.cacheManager as any;
        const keyvStore = anyManager.stores?.[0] as Keyv | undefined;


        if (keyvStore) {
            // Listen to internal redis socket errors
            keyvStore.on('error', (err: any) => {
                console.error('Redis Connection Error detected in CachingModule:', err.message);
            });
        }
    }
}