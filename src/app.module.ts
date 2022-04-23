import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { UserService } from './services/user/user.service';
import { MongooseModule }                         from '@nestjs/mongoose';
import { AppController }                          from './app.controller';
import { AppService }                             from './app.service';
import { AuthController}                          from "./controllers/auth/auth.controller";
import { LocaleMiddleware }                       from "./middlewares/locale.middleware";
import { AuthService }                            from './services/auth/auth.service';
import { ListController }                         from './controllers/list/list.controller';
import { ListService }                            from './services/list/list.service';
import { List, ListSchema }                       from "./models/list";
import { User, UserSchema }                       from "./models/user";

@Module({
  imports: [
    // DB connection...
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: List.name, schema: ListSchema}
    ])
  ],
  controllers: [AppController, AuthController, ListController],
  providers: [AppService, AuthService, ListService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LocaleMiddleware).forRoutes('*');
  }
}
