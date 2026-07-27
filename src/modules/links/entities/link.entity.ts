import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export type LinkDocument = HydratedDocument<Link>

@Schema()
export class Link {
    @Prop({ required: true })
    long_url!: string;

    @Prop({ required: true, unique: true })
    short_code!: string;

    @Prop()
    expirationTime!: number;
}

export const LinkSchema = SchemaFactory.createForClass(Link);

