import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Comment } from "./comment";

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop() productCode: number
    @Prop() title: string
    @Prop() tags: string[]
    @Prop() price: number
    @Prop() currency: string
    @Prop() discount: number
    @Prop() rating: number

    @Prop() category: string
    @Prop() properties: object
    // Комплектация и рекомендации
    @Prop() complactationAndRecommendations: {
        key: string,
        value: string
    }[]

    @Prop() amount: number
    @Prop() availability: boolean
    @Prop() manufacturer: string
    @Prop() provider: string

    @Prop() description : string
    @Prop() images: Buffer[]
    @Prop() videos: string[]
    
    @Prop() comments: Comment[]

    @Prop() addDate: Date
    @Prop() isHidden: boolean
    @Prop() isDeleted: boolean
}

export const ProductSchema = SchemaFactory.createForClass(Product)