import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './../users/entities/user.entity';
import {loginUserInput } from './../users/dto/login-user-input'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    login(user: User): { access_token: string, user: User} {
        const payload = {
            email: user.userEmail,
            sub: user.userId
        }
        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const valid = await bcrypt.compare(password, user.userPassword);
        if (user && valid){
            const { userPassword, ...result} = user;
            return result;
        }
        return null
    }

    async singup(loginUserInput: loginUserInput) {
        const user = await this.usersService.findByEmail(loginUserInput.userEmail);
        if (user){
            throw new Error('User already exist!');
        }
        const userPassword = await bcrypt.hash(loginUserInput.userPassword, 10);
        return this.usersService.create({
            ...loginUserInput,
            userPassword
        })
    }

}