import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalError";
import notFound from "./app/middlewares/notFoundRoutes";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://car-refresh-service-rbbocew9h-azir-uddins-projects.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("My Server is running");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
