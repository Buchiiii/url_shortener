import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export type LinkDocument = HydratedDocument<Link>


@Schema({ timestamps: true })
export class Link {

    @Prop({ unique: true })
    id!: number;

    @Prop({ required: true })
    long_url!: string;

    @Prop({ unique: true })
    short_code!: string;

    @Prop()
    expirationTime!: number;

    createdAt!: Date;
    updatedAt!: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);

