import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: UserDto) {
    console.log(createUserDto, 111);
    await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    // throw new ForbiddenException();
    // throw new HttpException('Forbiddenddddd', HttpStatus.FORBIDDEN);
    return this.usersService.findAll();
  }
}
