import { AppDataSource } from "./data-source";
const dotenv = require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import router from "./routes/index";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const corsOptions = {
      origin: "",
    };

    app.use(express.json());
    app.use(cors(corsOptions));
    app.use("/home", router);

    const main = async () => {
      app.listen(process.env.PORT, () =>
        console.log(`SERVER STARTED ON PORT ${process.env.PORT}`)
      );
    };
    main();
  })
  .catch((error) => console.log(error));
