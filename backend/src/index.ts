import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect.js";
import { authRouter } from "./routers/auth.js";
import { uploadsRouter } from "./routers/uploads.js";
import { newsRouter } from "./routers/news.js";
import { staffRouter } from "./routers/staff.js";
import { documentsRouter } from "./routers/documents.js";
import { settingsRouter } from "./routers/settings.js";
import { galleryRouter } from "./routers/gallery.js";
import { usersRouter } from "./routers/users.js";
import { rulesRouter } from "./routers/rules.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/uploads", uploadsRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/documents", documentsRouter);
app.use("/api/v1/settings", settingsRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/rules", rulesRouter);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3000);

async function start() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MONGO_URI is not set");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");

  await connectDB(mongoUri);
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
