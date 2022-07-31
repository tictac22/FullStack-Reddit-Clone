import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards";
import { PrismaService } from '../prisma/prisma.service';


@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
	
	constructor(private prismaService:PrismaService) {

	}
	@Get()
	async prisma() {
		return await this.prismaService.post.findMany({
			include: {
				comments: true,
				vote:true,
			},

		})
	}
}