import { Event } from '../schema/event.schema';

export const mapEventSchemaToDto = (event: Event): Partial<Event> => {
  const { _id, __v, createdAt, updatedAt, ...eventDto } = event.toObject();
  eventDto.id = _id;
  return eventDto;
};
