import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [PrismaModule],
})
export class BookingsModule {}
