import { IsString, IsEmail, Length } from "class-validator";

export class AuthWithCredentialsDTO {
  
  // dto kullanıcıdan gelen dataların kontorlü için kullanılır (req)
  @IsEmail()
  email: string;
  
  @IsString()
  @Length(6, 50)
  password: string;
}
