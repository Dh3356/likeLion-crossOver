import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateDto {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,9}$/)
  id: string;

  @IsString()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?])[A-Za-z\d~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?]{8,13}$/,
  )
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}
