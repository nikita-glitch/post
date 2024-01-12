import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Subcategory } from "./entity/Subcategory";
import { Topcategory } from "./entity/Topcategory";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DB_PORT),
  username: "postgres",
  password: "1234",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, Post, Subcategory, Topcategory],
  migrations: [],
  subscribers: [],
});
