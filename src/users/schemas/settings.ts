import { Prop } from "@nestjs/mongoose";

export class Settings {
    @Prop() is2FaEnabled: boolean
}