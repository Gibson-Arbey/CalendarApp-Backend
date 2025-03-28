import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  @Auth()
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.create(createEventoDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.eventoService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventoService.update(id, updateEventoDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.eventoService.remove(id);
  }
}
