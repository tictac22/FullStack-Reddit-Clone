
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CommunityDto {
	@IsNotEmpty()
	@IsString()
	@Length(1, 21)
	title: string;



}

export class CommunityServiceDto extends CommunityDto {
	@IsNotEmpty()
	@Length(1)
	id: number;
}