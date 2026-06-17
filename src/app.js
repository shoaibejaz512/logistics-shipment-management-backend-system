import express, { urlencoded } from "express";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";
import authRoute from "./routes/userAuth.route.js"
import { connectDatabase } from "./dbConnect/connectDB.js";
// import swaggerDocument from "/src/swagger-output.json";--------to be continue
dotenv.config();
connectDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument)); ------to be continue

app.use("/auth/user",authRoute)

export default app;
