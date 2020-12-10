import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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

export class Comment {
    @Prop() userId: string
    @Prop() text: string
    @Prop() addDate: Date
    @Prop() children: Comment[]
}

export class ProcessorProperties {
    // Линейка
    @Prop() model: string
    // Разъем процессора
    @Prop() socket: string
    // Совместимость
    @Prop() compatibility: string
    // Количество ядер
    @Prop() coresCount: number
    // Количество потоков
    @Prop() threadsCount: number
    // Частота процессора (ГГц)
    @Prop() frequency: number
    // Объекм кэша (Мб)
    @Prop() cashAmount: number
    // Ядро
    @Prop() core: string
    // Название графического процессора
    @Prop() graphicsProcessorName: string
    // Разблокированный множитель (параметр, который указывает над доступность к разгону процессора)
    @Prop() isUnlockedMultiplier: boolean
    // Максимальный объем памяти
    @Prop() maxMemoryAmount: number
    // Техпроцесс (нм)
    @Prop() techProcess: number
    // Термопакет (Вт)
    @Prop() termoPackage: number
    // Производительность (points)
    @Prop() performance: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)