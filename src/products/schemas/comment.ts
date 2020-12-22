import { Prop } from "@nestjs/mongoose"

export class Comment {
    @Prop() userId: string
    @Prop() text: string
    @Prop() addDate: Date
    @Prop() children: Comment[]
}