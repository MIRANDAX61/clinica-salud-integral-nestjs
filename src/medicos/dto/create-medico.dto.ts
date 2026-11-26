import { Type } from 'class-transformer';

import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono!: string;

  @Type(() => Number)
  @IsInt({ message: 'La especialidad debe ser un número entero' })
  @IsPositive({ message: 'La especialidad debe ser un número positivo' })
  especialidad_id!: number;
}