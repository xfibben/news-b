import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secretKey', // Usa una clave más segura y guárdala en variables de entorno
      //signOptions: { expiresIn: '60s' }, // El token expira en 60 segundos
    }),
  ],
    providers: [AuthService, JwtStrategy, UserService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}