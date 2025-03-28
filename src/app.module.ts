import { Module } from '@nestjs/common';
import { EventModule } from './evento/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(envs.databaseUrl), EventModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
