import { IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

enum PostType {
	USER = "USER",
	SUBREDDIT = "SUBREDDIT",
}
export class PostDto {
	@IsString()
	@IsNotEmpty()
	title: string;



	@IsJSON()
	@IsNotEmpty()
	body:string

	@IsOptional()
	@IsNumber()
	subRedditId:number

	@IsEnum(PostType)
	@IsNotEmpty()
	type:PostType
}
