import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schema/event.schema';
import { Model } from 'mongoose';
import { mapEventSchemaToDto } from './helpers/schema-to-dto.helper';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Partial<Event>> {
    const nuevoEvento = new this.eventModel(createEventDto);
    const savedEvent = await nuevoEvento.save();
    return mapEventSchemaToDto(savedEvent);
  }

  async findAll(): Promise<Partial<Event>[]> {
    const events = await this.eventModel.find().exec();
    return events.map(mapEventSchemaToDto);
  }

  async findOne(id: string): Promise<Partial<Event> | null> {
    const event = await this.eventModel.findById(id).exec();
    return event ? mapEventSchemaToDto(event) : null;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Partial<Event> | null> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
    return updatedEvent ? mapEventSchemaToDto(updatedEvent) : null;
  }

  async remove(id: string): Promise<Partial<Event> | null> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();
    return deletedEvent ? mapEventSchemaToDto(deletedEvent) : null;
  }
}
