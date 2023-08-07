import { Field } from "@nestjs/graphql";

export class CreateUserDto {

    @Field()
    userEmail: string

    @Field()
    userPassword: string


}
