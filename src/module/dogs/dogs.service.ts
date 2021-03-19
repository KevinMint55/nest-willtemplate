import { Injectable } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';
@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [{ name: '2', age: 20, breed: 's' }];

  create(cat: Dog) {
    this.dogs.push(cat);
  }

  findAll(): Dog[] {
    return this.dogs;
  }
}
