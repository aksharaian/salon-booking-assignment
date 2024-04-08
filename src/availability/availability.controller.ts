import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './availability.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api')
@UseGuards(AuthGuard)
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post('/availability')
  async setAvailability(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    try {
      await this.availabilityService.create(createAvailabilityDto);
      return { message: 'Availability saved successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/available-slots/:date')
  async getAvailableSlots(@Param('date') date: string) {
    const availableSlots = await this.availabilityService.getSlots(date);
    return availableSlots;
  }
}
