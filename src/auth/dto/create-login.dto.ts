import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'User Name', description: 'This is a unique ', required: true, })
    username: string;

    @ApiProperty({ example: "Password", description: 'Password Should be minimum of 8 char. combination of char,number and special character', required: true, minLength: 8 })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one letter, one number, and one special character.',
    })
    password: string;
}