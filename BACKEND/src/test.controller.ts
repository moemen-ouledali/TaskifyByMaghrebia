import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from './test.schema';

@Controller('test')
export class TestController {
  constructor(@InjectModel(Test.name) private testModel: Model<TestDocument>) {}

  @Get()
  async getAll() {
    return this.testModel.find().exec();
  }
}
