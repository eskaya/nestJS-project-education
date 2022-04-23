import { Injectable, NestMiddleware }      from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

const HEADER_LOCALE_KEY: string = "locale";
const DEFAULT_LOCALE_CODE: string = "en";

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const locale: string = req.header(HEADER_LOCALE_KEY) || "none";
    const isValidLocaleCode: boolean = [ "en", "tr", "jp" ].includes(locale);
    if(!isValidLocaleCode) {
      req.headers[HEADER_LOCALE_KEY] = DEFAULT_LOCALE_CODE;
    }
    
    next();
  }
}

