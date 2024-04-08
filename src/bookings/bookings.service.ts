import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './bookings.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateToDay } from 'src/utils/date-to-day';

@Injectable()
export class BookingsService {
  constructor(private prismaService: PrismaService) {}
  async create(createBookingDto: CreateBookingDto) {
    const alreadyExists = await this.prismaService.booking.findMany({
      where: {
        date: createBookingDto.date,
        user_id: createBookingDto.userId,
        slot: {
          equals: createBookingDto.slot,
        },
      },
    });

    console.log({
      alreadyExists,
    });

    if (alreadyExists.length) {
      throw new BadRequestException('Booking already exists');
    }
    console.log(createBookingDto.date);
    const day = DateToDay(createBookingDto.date);
    console.log({ day });
    const bookingCount = await this.prismaService.booking.count({
      where: {
        date: createBookingDto.date,
      },
    });
    console.log({ bookingCount });
    const availability = await this.prismaService.availability.findFirst();
    const availabilityItem = (availability.availability as any[]).find(
      (item) => item.day === day,
    );

    if (!availabilityItem) {
      throw new BadRequestException('this date is not available');
    }

    const slot = availabilityItem.slots.find(
      (item: any) =>
        item.start === createBookingDto.slot.start &&
        item.end === createBookingDto.slot.end,
    );

    if (!slot) {
      throw new BadRequestException('This slot is not available');
    }

    if (bookingCount > slot.maxCapacity) {
      throw new BadRequestException('capacity for this slot is full');
    }
    await this.prismaService.booking.create({
      data: {
        user_id: createBookingDto.userId,
        date: createBookingDto.date,
        slot: createBookingDto.slot,
      },
    });
  }

  async getBookings() {
    return await this.prismaService.booking.findMany();
  }
}
