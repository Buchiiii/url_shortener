import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashGeneratorProvider {
    private saltRounds: number;
    constructor(configService: ConfigService) {
        this.saltRounds = configService.get<number>("saltRounds") || 10;
    }

    public generateHash(link: string): string {
        // Logic to generate a hash
        return bcrypt.hashSync(link, this.saltRounds);
    }


}