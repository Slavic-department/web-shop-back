import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

import * as TokenGenerator from 'uuid-token-generator'; 

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    // Поиск пользователя по логину
    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ "username": username })
    }

    // Регистрация
    async register(createUserDto: CreateUserDto): Promise<User | undefined> {
        // try {
            const newUser = new this.userModel(createUserDto)
            newUser._id = new mongo.ObjectID()
            newUser.password = await bcrypt.hash(newUser.password, 10)
            newUser.isEmailConfirmed = false
            newUser.confirmationToken = new TokenGenerator(256, TokenGenerator.BASE62).generate()
            newUser.group = "default"
            return newUser.save()
        // } catch(e) {
            // console.debug(e)
        // }
    }

    // Подтверждение email
    async confirmEmail(id: string, confirmationToken: string) : Promise<User | undefined> {
        return this.userModel.findOneAndUpdate(
            { "$and": [{"_id": id}, {"confirmationToken": confirmationToken}] }, 
            { "$set": { "isEmailConfirmed": true } } 
        )
    }
}
