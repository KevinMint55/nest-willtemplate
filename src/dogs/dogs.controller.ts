import { Controller, Get } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
  @Get('hi')
  findAll(): string {
    return 'There are dogs';
  }
}
