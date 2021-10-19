import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => String)
    hello() {
        return "Hello World";
    }
}
