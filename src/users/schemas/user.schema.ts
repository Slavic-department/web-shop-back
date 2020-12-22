import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Settings } from "./settings";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop() id: string
    @Prop() username: string
    @Prop() email: string
    @Prop() password: string
    @Prop() fullName: string
    @Prop() isEmailConfirmed: string
    @Prop() group: string
    @Prop() settings: Settings
}
export const UserSchema = SchemaFactory.createForClass(User)