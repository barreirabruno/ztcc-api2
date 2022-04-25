import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomFieldValueValidator implements ValidatorConstraintInterface {
  validate(fieldValueParam: number, validationArguments?: ValidationArguments): boolean {
    return fieldValueParam <= 2000
  }
  defaultMessage?(fieldName?: ValidationArguments): string {
    return `Value field exceeds the transaction limit. Try again or get in contact.`
  }
}