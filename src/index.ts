import { AppDataSource } from "./data-source";
require("dotenv").config({ path: __dirname + "/.env" });
import * as express from "express";
import * as cors from "cors";
import router from "./routes/index";
import handleError from "./middleware/errorHandlingMiddleware";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    const corsOptions = {
      origin: "",
    };

    app.use(express.json());
    app.use(cors());
    app.use("/home", router);
    app.use(handleError);

    app.listen(process.env.PORT, () =>
      console.log(`SERVER STARTED ON PORT ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
