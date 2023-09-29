// login.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'harsh@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class requestPasswordResetDto {
    @ApiProperty({
    description: 'User email',
    example: 'harsh@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}

export class verifyOtpDto {
    @ApiProperty({
    description: 'User email',
    example: 'harsh@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;


    @ApiProperty({
    description: 'OTP ',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  readonly otp: string;

    @ApiProperty({
    description: 'newPassword',
    example: 'Password@123',
  })
  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;
}