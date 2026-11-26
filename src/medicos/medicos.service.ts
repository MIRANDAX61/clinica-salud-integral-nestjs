import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.medico.findMany();
  }

  async findOne(id: number) {
    const medico = await this.prisma.medico.findUnique({
      where: { id },
    });

    if (!medico) {
      throw new NotFoundException(`Médico ${id} no encontrado`);
    }

    return medico;
  }

  create(data: CreateMedicoDto) {
    return this.prisma.medico.create({
      data,
    });
  }

  async update(id: number, data: UpdateMedicoDto) {
    await this.findOne(id);

    return this.prisma.medico.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const citas = await this.prisma.cita.count({
      where: { medico_id: id },
    });

    if (citas > 0) {
      throw new ConflictException(
        'No se puede eliminar el médico porque tiene citas registradas',
      );
    }

    return this.prisma.medico.delete({
      where: { id },
    });
  }
}