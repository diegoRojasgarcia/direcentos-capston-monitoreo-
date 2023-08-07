import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean, {nullable: true})
  adult?: boolean;
}
