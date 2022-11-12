import { Injectable } from '@nestjs/common';
import { CalculatorDto, CalculatorOperation } from '../dto/calculator.dto';

@Injectable()
export class CalculatorService {
  calculate(typeOperation: CalculatorOperation, data: CalculatorDto) {
    switch (typeOperation) {
      case 'multiply':
        return data.firstNumber * data.secondNumber;
      case 'plus':
        return data.firstNumber + data.secondNumber;
      case 'subtraction':
        return data.firstNumber - data.secondNumber;
    }
  }
}
