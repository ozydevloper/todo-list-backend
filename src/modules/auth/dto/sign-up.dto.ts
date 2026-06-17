import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'elliot.alderson',
    minLength: 8,
    maxLength: 32,
    pattern: '^[a-z.]{8,32}$',
    required: true,
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(8, { message: 'Username must be at least 8 characters' })
  @MaxLength(32, { message: 'Username must be at most 32 characters' })
  @Matches(/^[a-z.]{8,32}$/, {
    message: 'Username must only contain lowercase letters and dots',
  })
  username!: string;

  @ApiProperty({
    example: 'Mr@Robot.EP407',
    minLength: 8,
    maxLength: 64,
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(64, { message: 'Password must be at most 64 characters' })
  @IsStrongPassword(
    {},
    {
      message:
        'Password must contain uppercase, lowercase, number, and special character',
    },
  )
  password!: string;
}
