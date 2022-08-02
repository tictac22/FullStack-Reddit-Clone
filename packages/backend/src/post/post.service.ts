import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";



@Injectable()
export class PostService {
	constructor(private prismaService:PrismaService) {

	}
	async createPost() {
	}
} 