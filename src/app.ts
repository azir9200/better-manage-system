import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalError";
import notFound from "./app/middlewares/notFoundRoutes";

const app: Application = express();

app.use(express.json());
app.use(cors());


app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  
  res.send('My Better Server is running');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;