import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './bookings.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/bookings')
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    try {
      await this.bookingsService.create(createBookingDto);
      return { message: 'Booking created successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getBookings() {
    return await this.bookingsService.getBookings();
  }
}
