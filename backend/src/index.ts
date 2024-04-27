import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import foodRoutes from "./routes/food.routes";
import connectDB from "./db/db";
import cookieParser from 'cookie-parser';
import protectedRoute from "./middleware/protectedRoute";
import { upload } from "./middleware/multer";
import { addFood } from "./controllers/donation.controller";


dotenv.config({
  path: './.env'
});
const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json({limit:"50mb"}));

const port = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/api/food/donate-food", protectedRoute,upload.single("foodImage"), addFood as any);
app.use("/api/auth", authRoutes);
app.use("/api/food",foodRoutes);

app.listen(port, () => {
  console.log("Listening on", port);
});
