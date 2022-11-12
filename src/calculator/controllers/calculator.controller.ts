import { Body, Controller, Headers, Put } from '@nestjs/common';
import { CalculatorService } from '../services/calculator.service';
import { CalculatorDto, CalculatorOperation } from '../dto/calculator.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}
  @Put('')
  doOperation(
    @Headers('Type-Operation') typeOperation: CalculatorOperation,
    @Body() data: CalculatorDto,
  ) {
    const response = this.calculatorService.calculate(typeOperation, data);
    return response;
  }
}
