import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import type { Cache } from "cache-manager";

@Injectable()
export class CachingService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {

    }
    public async getFromCache<T>(key: string): Promise<T | null> {
        try {
            const data = await this.cacheManager.get(key);
            return (data as T) || null;
        } catch (error) {
            console.error(`Cache Read Error [Key: ${key}]:`, error);
            return null;
        }
    }

    // Ensure arguments match standard store requirements
    public async setToCache(key: string, value: any, ttlInMs?: number): Promise<void> {
        try {
            await this.cacheManager.set(key, value, ttlInMs);
            console.log(`Successfully wrote to cache [Key: ${key}]`);
        } catch (error) {
            console.error(`Cache Write Error [Key: ${key}]:`, error);
        }
    }
}


