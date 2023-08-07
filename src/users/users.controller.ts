import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userEmail')
  findUserbyEmail(@Param('userEmail') userEmail: string) {
    const user = this.usersService.findByEmail(userEmail);
    return user
  }

  // @Post(':id')
  // findOne(@Param('id') id: number) {
  //   return this.usersService.findById(+id);
  // }

}
