import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Evento extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true, default: '' })
  notes?: string;

  @Prop({ required: true })
  start: Date;

  @Prop({
    required: true,
    validate: function (this: Evento, value: Date) {
      return value > this.start;
    },
  })
  end: Date;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
