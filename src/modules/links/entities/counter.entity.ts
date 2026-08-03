import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CounterDocument = HydratedDocument<Counter>

@Schema()
export class Counter {
    @Prop()
    _id!: string;

    @Prop({ default: 1000000 })
    _seq!: number;

}



export const CounterSchema = SchemaFactory.createForClass(Counter);