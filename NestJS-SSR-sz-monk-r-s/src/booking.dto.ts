import { IsEmail, IsNotEmpty, Min, Max, MinDate } from 'class-validator';

export class BookingDto {
  @IsNotEmpty({ message: 'A név megadása kötelező' })
  name: string;

  @IsNotEmpty({ message: 'Az email cím megadása kötelező' })
  @IsEmail({}, { message: 'Érvénytelen email cím formátum' })
  email: string;

  @IsNotEmpty({ message: 'A dátum megadása kötelező' })
  @MinDate(new Date(), { message: 'A dátum nem lehet korábbi a mai napnál' })
  date: Date;

  @IsNotEmpty({ message: 'A vendégek számának megadása kötelező' })
  @Min(1, { message: 'Minimum 1 vendég szükséges' })
  @Max(10, { message: 'Maximum 10 vendég foglalhat' })
  guests: number;
}