import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  Hello() {
    return 'Bye';
  }
}