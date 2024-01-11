import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Subcategory } from "./entity/Subcategory";
import { Topcategory } from "./entity/Topcategory";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User, Post, Subcategory, Topcategory],
  migrations: [],
  subscribers: [],
});
