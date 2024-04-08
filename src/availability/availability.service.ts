import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './availability.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateToDay } from 'src/utils/date-to-day';

@Injectable()
export class AvailabilityService {
  constructor(private prismaService: PrismaService) {}
  async create(createAvailabilityDto: CreateAvailabilityDto) {
    const availabilityData = {
      availability: createAvailabilityDto.availability,
    };
    
    await this.prismaService.availability.update({
      where: {
        id: '6612a31bb715cdf0279bfaa0',
      },
      data: availabilityData,
    });
  }

  async getSlots(dateString: string) {
    const day = DateToDay(dateString);
    const availabilities = await this.prismaService.availability.findMany({
      take: 1,
    });
    const dayAvailability = (
      availabilities[0].availability as { day: string; slots: any[] }[]
    )?.find((item) => item.day === day);

    if (dayAvailability) return dayAvailability.slots;
    return {
      message: 'No slots available',
    };
  }
}
