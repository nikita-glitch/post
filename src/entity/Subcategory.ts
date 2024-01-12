import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => Topcategory, (topcategory) => topcategory.subcategories)
  topcategory: Topcategory

  @OneToOne(() => Post)
  @JoinColumn()
  posts: Post
}