import { Controller, Post, Body, Query, Param, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Mailer } from './users.helper';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Регистрация
    @Post()
    async registration(@Body() createUserDto: CreateUserDto ) : Promise<User> {
        const newUser = await this.usersService.register(createUserDto)
        new Mailer().SendConfirmationToEmail(
            newUser.email, 
            `http://localhost:8080/users/${newUser._id}?confirmation-token=${newUser.confirmationToken}`
        )
        return newUser
    }

    // Подтверждение email
    @Get(":id")
    async confirmEmail(@Param("id") id: string, @Query("confirmation-token") confirmationToken: string) : Promise<User> {
        return this.usersService.confirmEmail(id, confirmationToken)
    }
}
