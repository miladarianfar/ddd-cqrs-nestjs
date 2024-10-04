import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/jwt.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { EncryptionService } from './encryption/encryption.service';
import { CityApiService } from './external-api/city-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, EncryptionService, CityApiService],
  exports: [AuthService, EncryptionService, CityApiService],
})
export class InfrastructureModule {}
