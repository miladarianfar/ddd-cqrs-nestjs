import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { AuthService } from 'src/infrastructure/auth/jwt.service';
import { CreateCityRequestCommand } from '../commands/create-city-request.command';
import { GetMyRequestsQuery } from '../queries/get-my-requests.query';

@Controller('api/cities')
export class CityRequestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('my-requests')
  @UseGuards(JwtAuthGuard)
  getMyRequests(
    @Req() req,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.queryBus.execute(
      new GetMyRequestsQuery(req.user.username, limit, offset),
    );
  }

  @Get(':postCode')
  @UseGuards(JwtAuthGuard)
  getCity(@Req() req, @Param('postCode') postCode: string) {
    return this.commandBus.execute(
      new CreateCityRequestCommand(postCode, req.user.username),
    );
  }
}
