import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { v1 } from "./v1/v1.router";

dotenv.config();
const app = express();
app.use(cors());

app.use("/v1", v1);

app.listen(process.env.PORT, () => {
    console.log(`Up and running on port ${process.env.PORT}`);
});