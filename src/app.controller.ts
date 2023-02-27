import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return '<h1>Fernandito - Story API</h1> <a href="https://github.com/fernandoigor/fernandito-story">Github</a>';
  }
}
