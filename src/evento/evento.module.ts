import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evento, EventoSchema } from './schema/evento.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }])],
  controllers: [EventoController],
  providers: [EventoService],
  
})
export class EventoModule {}
