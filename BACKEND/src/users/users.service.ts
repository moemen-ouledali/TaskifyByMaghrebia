import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashPassword,
        role: createUserDto.role || 'EMPLOYEE',
      });
      return await createdUser.save();
    } catch (err) {
      throw new Error(`Error creating user: ${err.message}`);
    }
  }

  // Find a user by email and password (login)
  async findOne(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) return null;

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return null;

      return user;
    } catch (err) {
      throw new Error(`Error finding user: ${err.message}`);
    }
  }

  // Optional: find user by email only
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}