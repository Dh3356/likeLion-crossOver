import { PartialType } from '@nestjs/mapped-types';
import { CreateDto } from './Create.dto';

export class UpdateDto extends PartialType(CreateDto) {}
