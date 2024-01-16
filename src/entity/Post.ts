import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Subcategory } from "./Subcategory";

export interface PostInterface {
  postText: string;
}

@Entity()
export class Post implements PostInterface{

  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column()
  postText: string

  @Column({ nullable: true })
  userId: number

  @Column({ nullable: true })
  subcategoryId: number

  @ManyToOne(() => User, (user) => user.posts)
  user: User

  @OneToOne(() => Subcategory, (subcategory) => subcategory.posts)
  @JoinColumn()
  subcategory: Subcategory
}