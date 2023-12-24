import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({
    onCreate: () => new Date()
  })
  createdAt?: Date;
  
  @Field()
  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date() 
  })
  updatedAt?: Date;
  
  @Field()
  @Property()
  title!: string;
}