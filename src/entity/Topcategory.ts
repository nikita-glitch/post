import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategory } from "./Subcategory";

export interface TopcategoryInterface {
  name: string;
} 

@Entity()
export class Topcategory implements TopcategoryInterface{

  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column()
  name: string

  @OneToMany(() => Subcategory, (subcategory) => subcategory.topcategory)
  subcategories: Subcategory[]
}