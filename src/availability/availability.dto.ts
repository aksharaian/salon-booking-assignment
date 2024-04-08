import { IsArray, IsNotEmpty, IsObject } from 'class-validator';

export class CreateAvailabilityDto {
  @IsArray()
  @IsNotEmpty()
  availability: {
    day: string;
    slots: { start: string; end: string; maxCapacity: number }[];
  }[];
}
