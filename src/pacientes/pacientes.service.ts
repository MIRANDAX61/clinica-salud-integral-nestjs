import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.paciente.findMany();
  }

  async findOne(id: number) {
    const paciente = await this.prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new NotFoundException(`Paciente ${id} no encontrado`);
    }

    return paciente;
  }

  create(data: any) {
    return this.prisma.paciente.create({
      data: {
        ...data,
        fecha_nacimiento: new Date(data.fecha_nacimiento),
      },
    });
  }

  async update(id: number, data: any) {
    await this.findOne(id);

    return this.prisma.paciente.update({
      where: { id },
      data: {
        ...data,
        ...(data.fecha_nacimiento && {
          fecha_nacimiento: new Date(data.fecha_nacimiento),
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const citas = await this.prisma.cita.count({
      where: { paciente_id: id },
    });

    if (citas > 0) {
      throw new ConflictException(
        'No se puede eliminar el paciente porque tiene citas registradas',
      );
    }

    return this.prisma.paciente.delete({
      where: { id },
    });
  }
}