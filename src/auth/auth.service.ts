import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        let user = await this.usersService.findOneByUsername(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            user.password = undefined
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            accessToken: this.jwtService.sign(payload),
            user: { id: user._id, username: user.username }
        }
    }
}
