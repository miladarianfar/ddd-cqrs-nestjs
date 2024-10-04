import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [ApiModule, InfrastructureModule, PersistenceModule],
})
export class AppModule {}
