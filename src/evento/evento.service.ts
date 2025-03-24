import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Evento } from './schema/evento.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventoService {

  constructor(@InjectModel(Evento.name) private readonly eventoModel: Model<Evento>) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const nuevoEvento = new this.eventoModel(createEventoDto);
    return nuevoEvento.save();
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }

  async findOne(id: string): Promise<Evento | null> {
    return this.eventoModel.findById(id).exec();
  }

  async update(id: string, updateEventoDto: UpdateEventoDto): Promise<Evento | null> {
    return this.eventoModel.findByIdAndUpdate(id, updateEventoDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Evento | null> {
    return this.eventoModel.findByIdAndDelete(id).exec();
  }
}
