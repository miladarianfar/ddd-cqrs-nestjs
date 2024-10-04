import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [ApiModule, InfrastructureModule, PersistenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
