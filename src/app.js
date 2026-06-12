import express, { urlencoded } from "express";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";
// import swaggerDocument from "/src/swagger-output.json";--------to be continue
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static({ urlencoded: true }));
// app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument)); ------to be continue

export default app;
