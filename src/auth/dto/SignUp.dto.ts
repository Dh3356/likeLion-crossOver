import { IsEmail, IsString, Matches } from 'class-validator';

//회원가입 DTO
export class SignUpDto {
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,9}$/)
  id: string; //아아디

  @IsString()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?])[A-Za-z\d~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?]{8,13}$/,
  )
  password: string; //비밀번호

  @IsString()
  @IsEmail()
  email: string; //이메일
}
