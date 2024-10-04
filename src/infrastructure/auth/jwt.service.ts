import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(username: string): Promise<string> {
    const payload = { username };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
