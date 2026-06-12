import express from "express";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv"
// import swaggerDocument from "/src/swagger-output.json";--------to be continue

const app = express();
dotenv.config()
// app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument)); ------to be continue

app.get("/",(req,res) => {
    res.send("Hello world")
})
export default app;
