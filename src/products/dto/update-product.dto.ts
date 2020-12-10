import { Comment } from './../schemas/product.schema';

export class UpdateProductDto {
    readonly productCode: number
    readonly title: string
    readonly tags: string[]
    readonly price: number
    readonly currency: string
    readonly discount: number
    readonly rating: number

    readonly category: string
    readonly properties: object
    // Комплектация и рекомендации
    readonly complactationAndRecommendations: {
        key: string,
        value: string
    }[]

    readonly amount: number
    readonly availability: boolean
    readonly manufacturer: string
    readonly provider: string

    readonly description : string
    readonly images: Buffer[]
    readonly videos: string[]
    
    readonly comments: Comment[]

    readonly addDate: Date
    readonly isHidden: boolean
    readonly isDeleted: boolean
}
