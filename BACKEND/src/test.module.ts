import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './test.schema';
import { TestController } from './test.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }])],
  controllers: [TestController],
})
export class TestModule {}
