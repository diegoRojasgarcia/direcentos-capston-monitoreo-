import { Field } from "@nestjs/graphql";

export class loginUserInput {

    @Field()
    userEmail: string

    @Field()
    userPassword: string

}



