import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { MedicosService } from './medicos.service.js';

@Controller('medicos')
export class MedicosController {
  constructor(
    private readonly medicosService: MedicosService,
  ) {}

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMedicoDto) {
    return this.medicosService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMedicoDto,
  ) {
    return this.medicosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.remove(id);
  }
}