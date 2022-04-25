import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsOptional, Validate } from "class-validator"
import { CustomFieldValueValidator } from '../../application/commons/validators'

export class BankServicesAPIDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  vatNumberSource: string

  @IsString()
  @IsOptional()
  @MinLength(11)
  @MaxLength(11)
  vatNumberDestination: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(3)
  currency: string

  @IsNumber()
  @Validate(CustomFieldValueValidator)
  value: number
}