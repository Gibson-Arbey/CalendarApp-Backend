import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { mapUserSchemaToDto } from './helpers/schema-to-dto.helper';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const passwordEncrypt = bcrypt.hashSync(password, 10);
      const user = new this.userModel({
        ...userData,
        password: passwordEncrypt,
      });

      await user.save();

      return { user: mapUserSchemaToDto(user), token: this.createJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException('El correo o contraseña son incorrectos');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('El correo o contraseña son incorrectos');
    }

    return { user: mapUserSchemaToDto(user), token: this.createJwtToken({ id: user.id }) };
  }

  async checkAuthStatus(user: User) {
    const userObj = user.toObject();
  
    return {
      id: userObj._id,
      name: userObj.name,
      email: userObj.email,
      token: this.createJwtToken({ id: userObj._id }),
    };
  }
  

  private createJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('El correo ya está registrado');
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Ocurrio un error inesperado');
  }

  
}
