import { Module } from '@nestjs/common';
import { CalculatorController } from '../controllers/calculator.controller';
import { CalculatorService } from '../services/calculator.service';

@Module({
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
