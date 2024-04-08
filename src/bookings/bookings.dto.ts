import { IsDateString, IsNotEmpty, IsObject, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty({
    message: 'User id is required',
  })
  userId: string;

  @IsDateString()
  @IsNotEmpty({
    message: 'Date is required',
  })
  date: string;

  @IsObject()
  @IsNotEmpty({
    message: 'Slot is required',
  })
  slot: {
    start: string;
    end: string;
  };
}
