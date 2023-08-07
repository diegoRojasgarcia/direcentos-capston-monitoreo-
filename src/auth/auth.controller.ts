import { Controller, Post, Req, UseGuards , Body} from "@nestjs/common";
import { Request } from 'express';
import { User } from "../users/entities/user.entity";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { loginUserInput } from "src/users/dto/login-user-input";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req: Request): { access_token: string, user: User } {
        return this.authService.login(req.user as User);
    }

    @Post('signup')
    signUp(@Body() loginUserInput: loginUserInput) {
        return this.authService.singup(loginUserInput)
    }
}