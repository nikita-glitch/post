import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Topcategory } from "./Topcategory";
import { Post } from "./Post";

export interface SubcategoryInterface {
  name: string;
}

@Entity()
export class Subcategory implements SubcategoryInterface{

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Topcategory, (topcategory) => topcategory.subcategories)
  topcategory: Topcategory

  @OneToOne(() => Post, (post) =>  post.subcategory)
  posts: Post[]
}