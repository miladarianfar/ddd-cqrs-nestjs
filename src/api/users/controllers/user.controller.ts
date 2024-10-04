import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { AuthService } from '../../../infrastructure/auth/jwt.service';
import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserByUsernameQuery } from '../queries/get-user-by-username.query';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto) {
    await this.commandBus.execute(
      new CreateUserCommand(body.username, body.password),
    );
    return { token: await this.authService.generateToken(body.username) };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req) {
    return this.queryBus.execute(new GetUserByUsernameQuery(req.user.username));
  }
}
