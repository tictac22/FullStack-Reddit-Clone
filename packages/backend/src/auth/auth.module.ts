import { Module } from "@nestjs/common";
import { PrismaModule } from './../prisma/prisma.module';
import { TokenModule } from './../token/token.module';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";


@Module({
	imports:[PrismaModule, TokenModule,JwtStrategy],
	controllers: [AuthController],
	providers:[AuthService]
})
export class AuthModule {}