import { Injectable } from "@nestjs/common";
import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(private prismaService:PrismaService) {

	}
	async signin(dto:AuthDto) {
		return  await this.prismaService.user.create({data:dto})
		
	}
	signup() {
		return "I am signing up";
	}
	prisma() {
		return this.prismaService.user.findMany()
	}
}

