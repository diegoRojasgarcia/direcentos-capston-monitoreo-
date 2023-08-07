import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto)
    this.usersRepository.save(newUser);
    const { userPassword, ...result } = newUser
    return result
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  // async findById(id: number): Promise<User> {
  //   return await this.usersRepository.findOne({ where:{
  //     userId: id
  //   } });
  // }


  findByEmail(userEmail: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { userEmail } });
  }

}
