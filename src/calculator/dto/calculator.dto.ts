import { IsNumber } from 'class-validator';

export class CalculatorDto {
  @IsNumber() firstNumber: number;
  @IsNumber() secondNumber: number;
}

export type CalculatorOperation = 'plus' | 'multiply' | 'subtraction';
