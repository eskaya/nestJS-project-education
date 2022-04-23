import { Controller, Post, Req, Body } from "@nestjs/common";
import { AuthWithCredentialsDTO }      from "../../dtos/auth-with-credentials.dto";
import { AuthService }                 from "../../services/auth/auth.service";
import { ValidationPipe }               from "@nestjs/common";


// POST: /auth
@Controller("auth")
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}
  
  // POST: /auth
  @Post("")
  async authWithCredentials(@Body(new ValidationPipe()) credentials: AuthWithCredentialsDTO) {
    return this.authService.authWithCredentials(credentials);
  }
  
  // POST: /auth/email
  // ?id=...&name=... -> Querystring
  // /auth/email/:userId -> Params -> auth/email/sabriayes
  @Post("email")
  sendPassViaEmail(@Req() req) {
    return this.authService.sendPassViaEmail();
  }
}
