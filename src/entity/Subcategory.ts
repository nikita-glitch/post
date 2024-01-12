import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Topcategory } from "./Topcategory";
import { Post } from "./Post";

export interface SubcategoryInterface {
  name: string;
}

@Entity()
export class Subcategory implements SubcategoryInterface{

  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column()
  name: string

  @ManyToOne(() => Topcategory, (topcategory) => topcategory.subcategories)
  topcategory: Topcategory

  @OneToOne(() => Post)
  posts: Post
}