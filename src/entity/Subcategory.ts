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

  @Column({ unique: true })
  name: string

  @Column({ nullable: true })
  topcategoryId: number

  @ManyToOne(() => Topcategory, (topcategory) => topcategory.subcategories)
  topcategory: Topcategory

  @OneToOne(() => Post)
  posts: Post
}