import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

export interface UserInterface {
	name: string;
	email: string;
	password: string;
}

@Entity()
export class User implements UserInterface{
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({default: 'user'}) 
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
