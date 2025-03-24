import { Module } from '@nestjs/common';
import { EventoModule } from './evento/evento.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';

@Module({
  imports: [MongooseModule.forRoot(envs.databaseUrl), EventoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
