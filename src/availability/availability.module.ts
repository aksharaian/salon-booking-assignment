import { Module } from '@nestjs/common';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  imports: [PrismaModule],
})
export class AvailabilityModule {}
