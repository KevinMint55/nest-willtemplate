import {
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'common/exception/forbidden.exception';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create() {
    const cat = {
      name: 'cat',
      age: 5,
      breed: null,
    };
    this.catsService.create(cat);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    throw new ForbiddenException();
    throw new HttpException('Forbiddenddddd', HttpStatus.FORBIDDEN);
    return this.catsService.findAll();
  }
}
