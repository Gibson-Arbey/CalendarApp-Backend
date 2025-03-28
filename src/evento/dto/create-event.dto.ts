import { IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  start: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha de finalización es obligatoria' })
  end: Date;
}
