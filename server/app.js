import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGODB_URI;
const Port = process.env.PORT || 3500;
console.log(mongoURI)

connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);

app.get("/", (req,res) => {
    res.send(
    "hello here"
    )
})


app.use(errorMiddleware);

app.listen( Port, () => {
    console.log(`Server is runing at ${Port} port`);
})