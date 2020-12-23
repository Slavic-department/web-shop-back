import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ "username": username })
    }

    async register(createUserDto: CreateUserDto): Promise<User | undefined> {
        const newUser = new this.userModel(createUserDto)
        newUser.password = await bcrypt.hash(newUser.password, 10)
        newUser.isEmailConfirmed = false
        newUser.group = "default"
        return newUser.save()
    }
}
