import { Module } from '@nestjs/common';
import { EventoModule } from './evento/evento.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(envs.databaseUrl), EventoModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
