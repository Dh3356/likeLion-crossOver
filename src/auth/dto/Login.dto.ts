import { IsString, Matches } from 'class-validator';

//로그인 DTO
export class LoginDto {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,9}$/)
  id: string; //아이디

  @IsString()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?])[A-Za-z\d~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?]{8,13}$/,
  )
  password: string; //비밀번호
}
