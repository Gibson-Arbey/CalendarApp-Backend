import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true, default: '' })
  notes?: string;

  @Prop({ required: true })
  start: Date;

  @Prop({
    required: true,
    validate: function (this: Event, value: Date) {
      return value > this.start;
    },
  })
  end: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
